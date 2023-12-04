
  class Animator {
    constructor(object) {
        this.object = object;
        this.keyFrames = {};
        this.currentAnimation = null;
        this.isPlaying = false;
        this.loopAnimation = false;

        this.startPosition = null;
        this.startRotation = null;
        this.startScale = null;
        this.stopDelay = 0;
        this.dynamicPosition = false;

        this.callbacks = {}; // Store callbacks and their corresponding percentages
    }
  
    addKeyFrame(animationName, keyFrameData) {
        const keyFrame = new KeyFrame(
          keyFrameData.time || 0,
          keyFrameData.position || createVector(0, 0),
          keyFrameData.rotation || 0,
          keyFrameData.scale || 1,
          keyFrameData.callbackFunction || null,          //Registered callback function being called in EVERY animation frame until it is defined
          keyFrameData.callOnceFunction || null           //Registered callback function being called in ONCE animation progressed to current frame
        );
        if (!this.keyFrames[animationName]) {
          this.keyFrames[animationName] = [];
        }
        this.keyFrames[animationName].push(keyFrame);
        this.keyFrames[animationName].sort((a, b) => a.time - b.time);

        return this
    }
      
    
  
    play(animationName, dynamicPosition = true, loop = false) {    //dynamic position allows animating to dynamic reference point
        if (!this.keyFrames[animationName]) {
          console.error(`Animation ${animationName} not found!`);
          return;
        }
        this.currentAnimation = animationName;
        this.dynamicPosition = dynamicPosition;
        this.isPlaying = true;
        this.loopAnimation = loop;
        this.startTime = millis();
        this.currentFrameIndex = 0;
        if(dynamicPosition)
          this.startPosition = this.object.pos;
        else
          this.startPosition = this.object.pos.copy();
        this.startRotation = this.object.rotation;
        this.startScale = this.object.scale;

        // Reset callback flags
        for (const percent in this.callbacks) {
          this.callbacks[percent].called = false;
        }

        return this;
    }
  
    stop() {
      this.isPlaying = false;
    }

    playing(){
      return this.isPlaying;
    }

    // Add a callback function to be called at a specific percentage of the animation
    addCallbackAtPercent(percent, callback) {
      this.callbacks[percent] = { callback, called: false };
    }

    addCallbackAtFinished(callback) {
      this.addCallbackAtPercent(1, callback);
    }
  
    update() {
        if (!this.isPlaying ) {
          return;
        }
        const elapsedTime = millis() - this.startTime;
        const keyFrames = this.keyFrames[this.currentAnimation];
        while (this.currentFrameIndex < keyFrames.length - 1 && keyFrames[this.currentFrameIndex + 1].time < elapsedTime) {
          this.currentFrameIndex++;

          //call function once when the animation progress reached the keyFrame
          if(keyFrames[this.currentFrameIndex].callOnceFunction) keyFrames[this.currentFrameIndex].callOnceFunction();             
        }
        const currentFrame = keyFrames[this.currentFrameIndex];
        const nextFrame = keyFrames[this.currentFrameIndex + 1] || currentFrame;
        const frameProgress = (elapsedTime - currentFrame.time) / (nextFrame.time - currentFrame.time);
        const position = p5.Vector.lerp(currentFrame.position, nextFrame.position, frameProgress);
        const rotation = lerp(currentFrame.rotation, nextFrame.rotation, frameProgress);
        const scale = lerp(currentFrame.scale, nextFrame.scale, frameProgress);

        // this.position.set(this.position || this.startPosition)

        this.object.pos.set(p5.Vector.add(this.startPosition, position));
        this.object.rot = rotation || this.startRotation;
        this.object.scale = scale || this.startScale;

        //time paased between 2 keyFrames
        const timePassed = elapsedTime - keyFrames[this.currentFrameIndex].time;
        if(currentFrame.callbackFunction) currentFrame.callbackFunction(timePassed);


        // if (!this.loopAnimation && this.currentFrameIndex === keyFrames.length - 1) {
        //   this.isPlaying = false;
        // }
        if (!this.loopAnimation && this.currentFrameIndex === keyFrames.length - 1) {
            this.isPlaying = false;
          } else if (this.loopAnimation && this.currentFrameIndex === keyFrames.length - 1) {
            this.currentFrameIndex = 0;
            this.startTime = millis();
            if(this.dynamicPosition)
              this.startPosition = this.object.pos;
            else
              this.startPosition = this.object.pos.copy();
            this.startRotation = this.object.rot;
            this.startScale = this.object.scale;
          }

        

        // Call the callbacks at specified percentages
        // const totalAnimationTime = keyFrames[keyFrames.length - 1].time;
        // for (const percent in this.callbacks) {
        //   if (percent >= 0 && percent <= 1) {
        //     const time = percent * totalAnimationTime;
        //     if (elapsedTime >= time && elapsedTime < time + deltaTime) {
        //       this.callbacks[percent]();
        //     }
        //   }
        // }

        const totalAnimationTime = keyFrames[keyFrames.length - 1].time;
        for (const percent in this.callbacks) {
          if (percent >= 0 && percent <= 1) {
            const time = percent * totalAnimationTime;
            if (elapsedTime >= time && !this.callbacks[percent].called) {
              this.callbacks[percent].called = true;
              this.callbacks[percent].callback();
            }
          }
        }

        


      }
  }
  