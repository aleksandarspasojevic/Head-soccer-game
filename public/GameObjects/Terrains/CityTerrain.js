


class CityTerrain extends Terrain{
    
    constructor(image){
        super(image);
        //OBSTACLE 
        this.centerWidth = 132;      //center circle width
        this.centerHeight = 0;

        //Create center obstacle collider
        this.centerObstacleCollider = new RectCollider(createVector(0, this.bottomBound - 13 - (this.centerHeight-30)/2), 132, this.centerHeight+30);  //hardcocded center obstacle collider


        //Create object to be animated
        this.risingTerrainObstacle = {
            pos: createVector(0, 0), 
            rot: 0,
            scale: 0.5
        }

        this.terrainObstacleAnimator = new Animator(this.risingTerrainObstacle);
        const randomTimeGeneration = random(10000, 40000);                        //Obstacle is generated randomly between 10s and 40s
        const obstacleDuration = 10000;                                           //Obstacle lasts for 10s
        const obstacleAppearTime = 1000;
        const obstacleHeight = 50;

        this.terrainObstacleAnimator.addKeyFrame('risingTerrain', {
            time: 0,
            position: createVector(0, 0)
        }).addKeyFrame('risingTerrain', {
            time: randomTimeGeneration,
            position: createVector(0, 0), 
            callOnceFunction: ()=>{

                const rectangularSource = new RectangularSource(-this.centerWidth/2, this.bottomBound - obstacleHeight/2 + 30, 10, 40);
                rectangularSource.setAngleInterval(PI - PI/6, 0);
                rectangularSource.setMagnitudeInterval(1, 10);
                const particleSystemLeft = new DirtParticleSystem(rectangularSource, 5, 3, 6, false);
                particleSystemLeft.enableCollisionDetection(this.bottomBound + 40, 0.5);
                particleSystemLeft.useGravity(0.1);
                particleSystemLeft.start();

                const rectangularSource4 = new RectangularSource(-this.centerWidth/2, this.bottomBound - obstacleHeight/2 + 10, 10, 40);
                rectangularSource4.setAngleInterval(PI/2 - PI/6, 2*PI - PI/2 - PI/3);
                rectangularSource4.setMagnitudeInterval(1, 3);
                const particleSystemLeft1 = new GlowParticleSystem(rectangularSource4, 20, 3, 20, false);
                particleSystemLeft1.enableCollisionDetection(this.bottomBound + 20, 0.5);
                particleSystemLeft1.start();


                
                const rectangularSource3 = new RectangularSource(this.centerWidth/2, this.bottomBound - obstacleHeight/2 + 30, 10, 40);
                rectangularSource3.setAngleInterval(PI/6, PI/2 + PI/2);
                rectangularSource3.setMagnitudeInterval(1, 10);
                const particleSystemRight = new DirtParticleSystem(rectangularSource3, 5, 3, 6, false);
                particleSystemRight.start();
                particleSystemRight.useGravity(0.1);
                particleSystemRight.enableCollisionDetection(this.bottomBound + 35, 0.5);



                const rectangularSource2 = new RectangularSource(this.centerWidth/2, this.bottomBound - obstacleHeight/2 + 10, 10, 40);
                rectangularSource2.setAngleInterval(-PI/6, PI/2 + PI/6);
                rectangularSource2.setMagnitudeInterval(1, 3);
                const particleSystemRight1 = new GlowParticleSystem(rectangularSource2, 20, 3, 20, false);
                particleSystemRight1.start();
                particleSystemRight1.enableCollisionDetection(this.bottomBound + 20, 0.5);


                this.particleSystemManager.addParticleSystem(particleSystemLeft);
                this.particleSystemManager.addParticleSystem(particleSystemLeft1);
                this.particleSystemManager.addParticleSystem(particleSystemRight);
                this.particleSystemManager.addParticleSystem(particleSystemRight1);

                soundManager.playRisingTerrainSound();
            }
        }).addKeyFrame('risingTerrain', {
            time: randomTimeGeneration + obstacleAppearTime,
            position: createVector(0, obstacleHeight),
            callOnceFunction: ()=>{
                soundManager.stopRisingTerrainSound();
            }
        }).addKeyFrame('risingTerrain', {
            time: randomTimeGeneration + obstacleAppearTime + obstacleDuration,
            position: createVector(0, obstacleHeight)
        }).addKeyFrame('risingTerrain', {
            time: randomTimeGeneration + obstacleAppearTime + obstacleDuration + obstacleAppearTime,
            position: createVector(0, 0)
        });

        this.terrainObstacleAnimator.play('risingTerrain', false, false);


        this.flashlight = {
            pos: createVector(0, 0), 
            rot: 0,
            scale: 0.5
        }
        //ANIMATION keyframes
        this.flashlight_animator = new Animator(this.flashlight);

        this.flashlight_animator.addKeyFrame('flashlight', {
            time: 100,
            scale: 0.1
        })
        .addKeyFrame('flashlight', {
            time: 200,
            scale: 0.5
        })
        .addKeyFrame('flashlight', {
            time: 300,
            scale: 0.1
        })

        this.flashlight_animator.play('flashlight')
        setInterval(()=>{
            this.flashlight.pos.set(createVector(random(-250, 250), random(0, 80)))
            this.flashlight_animator.play('flashlight')
        }, 500);


        this.particleSystemManager = new ParticleSystemManager();
    }


    update(){
        super.update();

        this.flashlight_animator.update();
        this.centerObstacleCollider.initCollider(createVector(0, this.bottomBound - 13 - (this.centerHeight-30)/2), 132, this.centerHeight+30);

        this.centerHeight = this.risingTerrainObstacle.pos.y;

        //SOLVE object collisions with terrain obstacle
        if(this.centerHeight > 0){
            if (this.centerObstacleCollider.inCollision(this.player1.bodyCollider)) 
            this.resolveObstacleCollision(this.player1);

            if (this.centerObstacleCollider.inCollision(this.player2.bodyCollider)) 
                this.resolveObstacleCollision(this.player2);
            
            if (this.centerObstacleCollider.inCollision(this.player1.ball.collider)) 
                this.resolveBallCollision(this.player1.ball);
                
        }
        
        this.terrainObstacleAnimator.update();
        this.particleSystemManager.update();

    }


    show(){
        super.show();
      

        layer_manager.addAsset(1, {              //Terrain center 
            'img' : TERRAIN_CENTER_IMG,
            'img_pos': createVector(0, this.bottomBound - 13 - this.centerHeight),
            'scale' : 0.5
          }).addAsset(-1, {    
            "draw": () => {
              push()
              noStroke()
              rectMode(CENTER);
    
              const shadowIntensity = 15;
              if(this.centerHeight > 0){
                fill(125 - shadowIntensity, 150 - shadowIntensity, 65 - shadowIntensity);
                rect(0, this.bottomBound - 13 - (this.centerHeight-30)/2, 132, this.centerHeight+30);
      
                fill(110 - shadowIntensity, 133 - shadowIntensity, 59 - shadowIntensity)
                rect(0, this.bottomBound - 13 - (this.centerHeight-30)/2, 68, this.centerHeight+30);
                
              }
              
              pop()
            }
          }).addAsset(0, {    //debug borders
            "draw": () => {
            //   push()
            //   stroke(0, 255, 0)
            //   noFill()
            //   rect(this.leftBound, this.topBound, this.rightBound - this.leftBound, this.bottomBound - this.topBound)

            //   rectMode(CENTER);
            //   rect(this.centerObstacleCollider.position.x, this.centerObstacleCollider.position.y, this.centerObstacleCollider.width, this.centerObstacleCollider.height)
            //   pop()
            }
          }).addAsset(0, {    //twinkling effect from the public
            "draw": () => {
              noStroke()
              
              for(let i = 50; i > 5; i-=12){
                fill(255, 255, 255, map(i, 50, 0, 10, 200))
                ellipse(0,0, i, i)
              }
            },
            'scale' : this.flashlight.scale,
            'pos': this.flashlight.pos
          })


          this.particleSystemManager.show();
    }


    terrainHeightAt(xPos){               //Terrain has height obstacle, so terrain height is specific refering to xPos

        const heightOffest = 10;    //offset created by visual dislocation
        if(this.centerHeight > 0){
            if(xPos >= -this.centerWidth/2 && xPos <= this.centerWidth/2)
                return this.bottomBound - this.centerHeight-heightOffest;              
        }
        
        return this.bottomBound;
    }


    resolveObstacleCollision(player) {
        const displacement = this.calculateCollisionDisplacement(player.bodyCollider);
        player.pos.add(displacement);

        if (displacement.y < 0 && !player.jumping) {
            player.velocity.y = 0;
        }

    }


    resolveBallCollision(ball) {
        // Calculate the displacement vector needed to move the ball out of the obstacle
        const dx = ball.collider.position.x - this.centerObstacleCollider.position.x;
        const dy = ball.collider.position.y - this.centerObstacleCollider.position.y;

        // Calculate the horizontal and vertical distances between ball edge and obstacle's edges
        const horizDistance =
            Math.abs(dx) - (this.centerObstacleCollider.width / 2 + ball.collider.radius);
        const vertDistance =
            Math.abs(dy) - (this.centerObstacleCollider.height / 2 + ball.collider.radius);


        const displacement = createVector(0, 0);

        // Check if the ball is colliding horizontally
        if (Math.abs(horizDistance) < Math.abs(vertDistance)) {
            // Reverse the horizontal component of the ball's velocity with FRICTION and BOUNCINESS in respect
            ball.velocity.x *= -ball.bounciness * this.FRICTION_COEFFICIENT;

            displacement.x = (horizDistance ) * Math.sign(-dx);
        } else {
            // Reverse the vertical component of the ball's velocity with FRICTION and BOUNCINESS in respect
            ball.velocity.y *= -ball.bounciness * this.FRICTION_COEFFICIENT;

            displacement.y = (vertDistance ) * Math.sign(-dy);
        }
        ball.pos.add(displacement);

    }
   


    calculateCollisionDisplacement(collider) {
        // Calculate the distances between collider positions and obstacle's center
        const dx = collider.position.x - this.centerObstacleCollider.position.x;
        const dy = collider.position.y - this.centerObstacleCollider.position.y;
    
        // Calculate the distances between collider edges and obstacles edges
        const horizDistance =
            Math.abs(dx) - (this.centerObstacleCollider.width / 2 + collider.width / 2);
        const vertDistance =
            Math.abs(dy) - (this.centerObstacleCollider.height / 2 + collider.height / 2);
    

        const displacement = createVector(0, 0);
    
        // Determine the direction of displacement based on the smaller penetration
        if (Math.abs(horizDistance) < Math.abs(vertDistance)) {
            displacement.x = (horizDistance + 1) * Math.sign(-dx); // Adding 1 to ensure slight separation
        } else {
            displacement.y = (vertDistance + 1) * Math.sign(-dy); // Adding 1 to ensure slight separation
        }
    
        return displacement;
    }
    

}
  