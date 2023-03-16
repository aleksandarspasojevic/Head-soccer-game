
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
    }
  
    addKeyFrame(animationName, keyFrameData) {
        const keyFrame = new KeyFrame(
          keyFrameData.time || 0,
          keyFrameData.position || createVector(0, 0),
          keyFrameData.rotation || 0,
          keyFrameData.scale || createVector(1, 1)
        );
        if (!this.keyFrames[animationName]) {
          this.keyFrames[animationName] = [];
        }
        this.keyFrames[animationName].push(keyFrame);
        this.keyFrames[animationName].sort((a, b) => a.time - b.time);

        return this
    }
      
    
  
    play(animationName, loop = false) {
        if (!this.keyFrames[animationName]) {
          console.error(`Animation ${animationName} not found!`);
          return;
        }
        this.currentAnimation = animationName;
        this.isPlaying = true;
        this.loopAnimation = loop;
        this.startTime = millis();
        this.currentFrameIndex = 0;
        this.startPosition = this.object.pos;
        this.startRotation = this.object.rotation;
        this.startScale = this.object.scale;
      }
  
    stop() {
      this.isPlaying = false;
    }
  
    update() {
        if (!this.isPlaying ) {
          return;
        }
        const elapsedTime = millis() - this.startTime;
        const keyFrames = this.keyFrames[this.currentAnimation];
        while (this.currentFrameIndex < keyFrames.length - 1 && keyFrames[this.currentFrameIndex + 1].time < elapsedTime) {
          this.currentFrameIndex++;
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

        // if (!this.loopAnimation && this.currentFrameIndex === keyFrames.length - 1) {
        //   this.isPlaying = false;
        // }
        if (!this.loopAnimation && this.currentFrameIndex === keyFrames.length - 1) {
            this.isPlaying = false;
          } else if (this.loopAnimation && this.currentFrameIndex === keyFrames.length - 1) {
            this.currentFrameIndex = 0;
            this.startTime = millis();
            this.startPosition = this.object.pos;
            this.startRotation = this.object.rot;
            this.startScale = this.object.scale;
          }
      }
  }
  