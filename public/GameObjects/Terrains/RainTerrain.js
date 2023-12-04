

class RainTerrain extends Terrain {
    constructor(image, rainPuddleImage, thunderCloudImage) {
        super(image);
        this.rainPuddle_img = rainPuddleImage;
        this.thunderCloud_img = thunderCloudImage;
        this.particleSystemManager = new ParticleSystemManager();

        this.rainPuddleObstacle = {
          pos: createVector(-90, this.bottomBound - 5),
          rot: 0,
          scale: 0.4
        }
   
        this.thunderCloud = {
          pos: createVector(-90, this.topBound + 150),
          rot: 0,
          scale: 0.5
        }

        this.rainPuddleWidth = this.rainPuddle_img.width * this.rainPuddleObstacle.scale;
        this.rainPuddleHeight = this.rainPuddle_img.height * this.rainPuddleObstacle.scale;
        this.rainPuddleCollider = new RectCollider(this.rainPuddleObstacle.pos, this.rainPuddleWidth, this.rainPuddleHeight);
        this.rainPuddleActive = false;
        this.thunderCloudActive = false;

        const randomTimeGeneration = random(10000, 50000);                   //random is generated in random time betweeen 10s and 50s of gameplay
        const obstacleGrowDuration = 5000;
        const obstacleDuration = 5000; 


        this.thunderCloudAnimator = new Animator(this.thunderCloud);
        this.terrainObstacleAnimator = new Animator(this.rainPuddleObstacle);

        this.thunderCloudAnimator.addKeyFrame('thunderCloud', {
            time: 0,
            position: createVector(0, -100),
            scale: 0.5
        }).addKeyFrame('thunderCloud', {
            time: randomTimeGeneration,
            position: createVector(0, -100), 
            scale: 0.5,
            callOnceFunction: ()=>{
              this.thunderCloudActive = true;
              const rainPosition = this.thunderCloud.pos;

              const rectangularSource1 = new RectangularSource(rainPosition.x, rainPosition.y, 220, 1);
              rectangularSource1.setDynamicSourcePosition(rainPosition);
              rectangularSource1.setAngleInterval(PI/2 - PI/6, PI/2 + PI/6);
              rectangularSource1.setMagnitudeInterval(2, 8);

              const rainParticleSystem1 = new ShowerRainParticleSystem(rectangularSource1, 20, 10, 100, false);
              rainParticleSystem1.start();
              rainParticleSystem1.enableCollisionDetection(this.bottomBound + 12, 0.3);

              const rainParticleSystem2 = new ShowerRainParticleSystem(rectangularSource1, 20, 10, 100, false);
              rainParticleSystem2.start();
              rainParticleSystem2.enableCollisionDetection(this.bottomBound + -12, 0.3);

              const rainParticleSystem3 = new ShowerRainParticleSystem(rectangularSource1, 20, 10, 100, false);
              rainParticleSystem3.start();
              rainParticleSystem3.enableCollisionDetection(this.bottomBound, 0.3);


              this.particleSystemManager.addParticleSystem(rainParticleSystem1);
              this.particleSystemManager.addParticleSystem(rainParticleSystem2);
              this.particleSystemManager.addParticleSystem(rainParticleSystem3);

            }
        }).addKeyFrame('thunderCloud', {
            time: randomTimeGeneration + obstacleGrowDuration * 0.2,
            position: createVector(0, 20), 
            scale: 0.5,
            callOnceFunction: ()=>{
              this.rainPuddleActive = true;

              this.terrainObstacleAnimator.addKeyFrame('rainPuddleGrowing', {
                  time: 0,
                  position: createVector(0, 0),
                  scale: 0.2
               }).addKeyFrame('rainPuddleGrowing', {
                  time: obstacleGrowDuration * 0.8,
                  position: createVector(0, 0),
                  scale: 0.4
              }).addKeyFrame('rainPuddleGrowing', {
                  time: obstacleGrowDuration * 0.8  + obstacleDuration * 0.6,
                  position: createVector(0, 0),
                  scale: 0.4
              }).addKeyFrame('rainPuddleGrowing', {
                time: obstacleGrowDuration * 0.8  + obstacleDuration,
                  position: createVector(0, 0),
                  scale: 0.1,
                  callOnceFunction: ()=>{
                    this.rainPuddleActive = false;
                  }
              })


              this.terrainObstacleAnimator.play('rainPuddleGrowing', false, false);

            }
        }).addKeyFrame('thunderCloud', {
            time: randomTimeGeneration + obstacleGrowDuration *0.8,
            position: createVector(0, 20), 
            scale: 0.35
        }).addKeyFrame('thunderCloud', {
            time: randomTimeGeneration + obstacleGrowDuration + 3000,
            position: createVector(700, 20), 
            scale: 0.35,
            callOnceFunction: ()=>{
              this.thunderCloudActive = false;
            }
        })

        this.thunderCloudAnimator.play('thunderCloud', false, false);



        const rectangularSource1 = new RectangularSource(-WIDTH/4, -HEIGHT/4, WIDTH, 1);
        rectangularSource1.setAngleInterval(PI/2 - PI/6, PI/2 + PI/6);
        rectangularSource1.setMagnitudeInterval(1, 3);

        const rainParticleSystem1 = new RainParticleSystem(rectangularSource1, 20, 5, 1, true);
        rainParticleSystem1.start();
        rainParticleSystem1.enableCollisionDetection(this.bottomBound + 20, 0.3);

        const rainParticleSystem2 = new RainParticleSystem(rectangularSource1, 20, 5, 1, true);
        rainParticleSystem2.start();
        rainParticleSystem2.enableCollisionDetection(this.bottomBound - 30, 0.3);


        this.particleSystemManager.addParticleSystem(rainParticleSystem1);
        this.particleSystemManager.addParticleSystem(rainParticleSystem2);
    }

    //Write general updating code
    update(){


      //AFFECT players and ball if rain puddle is active
      const ball = this.player1.ball;
      if(this.rainPuddleActive){
        
        if (this.rainPuddleCollider.inCollision(this.player1.bodyCollider)) {
          this.player1.setSpeedX(this.player1.velocity.x/2);
          this.player1.setJumpStrength(5);
        }else{
          this.player1.restoreDefaultJumpStrength();
        }

        if (this.rainPuddleCollider.inCollision(this.player2.bodyCollider)) {
          this.player2.setSpeedX(this.player2.velocity.x/2);
          this.player2.setJumpStrength(5);
        }else{
          this.player2.restoreDefaultJumpStrength();
        }

        if (this.rainPuddleCollider.inCollision(ball.collider)) {
          ball.setBounciness(0.5);
          ball.setDynamicFriction(0.9);
        }else{
          ball.restoreDefaultBounciness();
          ball.restoreDefalutDynamicFriction();
        }
      }else{
        this.player1.restoreDefaultJumpStrength();
        this.player2.restoreDefaultJumpStrength();
        ball.restoreDefalutDynamicFriction();
      }


      this.rainPuddleWidth = this.rainPuddle_img.width * this.rainPuddleObstacle.scale;
      this.rainPuddleHeight = this.rainPuddle_img.height * this.rainPuddleObstacle.scale;
      this.rainPuddleCollider.initCollider(this.rainPuddleObstacle.pos, this.rainPuddleWidth, this.rainPuddleHeight);


      this.thunderCloudAnimator.update();
      this.terrainObstacleAnimator.update();
      this.particleSystemManager.update();
    }       
  
    show() {
      
      layer_manager.addAsset(-1, {
        'img' : this.image,
        'img_pos': createVector(0, 0),
        'scale' : 0.5
      }).addAsset(-1, {                     //DEBUG colliders
        "draw": () => {
          // push()
          // stroke(0, 255, 0)
          // noFill()
          // rectMode(CENTER);
          // rect(this.rainPuddleCollider.position.x, this.rainPuddleCollider.position.y, this.rainPuddleCollider.width, this.rainPuddleCollider.height)
          // pop()
        }
      });

      if(this.rainPuddleActive){
        layer_manager.addAsset(-1, {
          'img' : this.rainPuddle_img,
          'img_pos': this.rainPuddleObstacle.pos,
          'scale' : this.rainPuddleObstacle.scale
        })
      }


      if(this.thunderCloudActive){
        layer_manager.addAsset(101, {
          'img' : this.thunderCloud_img,
          'img_pos': this.thunderCloud.pos,
          'scale' : this.thunderCloud.scale
        })
      }
      
      this.particleSystemManager.show();
    }


  }
  