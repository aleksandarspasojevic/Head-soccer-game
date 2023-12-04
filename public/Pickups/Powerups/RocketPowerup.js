




class RocketPowerup extends Powerup {
    constructor(img, pos) {
      super("rocket", pos.x, pos.y, 0, img);
      this.pickupCollider = new CircleCollider(this.pos.copy(), 20, createVector(0, 0));
      
      this.player = null;
      this.shootIntensity = 30;
      this.weapon_enabled = false;
      this.pickup_animator = new Animator(this);
      this.pickup_animator.addKeyFrame('idle', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 0.48
      }).addKeyFrame('idle', {
        time: 200,
        position: createVector(0, -3),
        rotation: 0.2,
        scale: 0.53
      })
      .addKeyFrame('idle', {
        time: 400,
        position: createVector(0, 0),
        rotation: -0.2,
        scale: 0.53
      })
      .addKeyFrame('idle', {
        time: 500,
        position: createVector(0, 0),
        rotation: 0.1,
        scale: 0.53
      })
      .addKeyFrame('idle', {
        time: 600,
        position: createVector(0, -5),
        rotation: -0.1,
        scale: 0.53
      })
      .addKeyFrame('idle', {
        time: 800,
        position: createVector(0, -30),
        rotation: 0,
        scale: 0.53
      })
      .addKeyFrame('idle', {
        time: 1600,
        position: createVector(0, 0),
        rotation: 0,
        scale: 0.53
      })
      

      this.pickup_animator.play('idle', false, true);

    }

    update(){
      this.pickup_animator.update();
    }

    show(){
      if (this.active) {
        layer_manager.addAsset(11, {    //debug colliders
          "draw": () => {
            // push()
            // noFill();
            // stroke(0, 255, 0)
            // ellipse(this.pickupCollider.position.x, this.pickupCollider.position.y, this.pickupCollider.radius * 2, this.pickupCollider.radius * 2)
            // pop()
          }
        }).addAsset(5, {
          'img' : this.img,
          'img_pos': createVector(0,0),
          'scale': 0.1,
          'pos': createVector(this.pos.x, this.pos.y),
          'rot': this.rot
        }).addAsset(4, {    
          "draw": () => {                //GLOW effect
            push()
            noStroke();

            for(let i = 150; i > 20; i-=6){
              fill(255, 200, 130, map(i, 150, 0, 0, 25))
              ellipse(this.pos.x, this.pos.y, i, i)
            }
            pop()
          }
        })
        
        // image(this.img, this.pos.x, this.pos.y, this.size, this.size);
      }
    }


    //Overriden effect method
    //Added behaviour: If ball is not currently on the terrain, can not play the effect
    effect() {
      // Handle the effect of the power-up when a player collects it.
      const pickupActivator = this.player.pickupActivator;

      let ball = this.player.ball;
      //If ball is not visible, do not play the effect
      if(!ball.visibility) return false;   
      
      if(!pickupActivator.hasActivePowerupEffect()){       //if there is no any active powerup effect, play effect
        pickupActivator.playEffect(this);
        this.effectInit();                                  //Initialize effect
        return true;
      }

      return false;
    }
  


    effectInit(){
      console.log("POWERUP INITIATED");
      const pickupActivator = this.player.pickupActivator;

      const levitatingRaiseTime = 1000;

      //WEAPON
      this.weapon = {
        pos: createVector(0, 0), 
        rot: 0, 
        scale: 0.2
      }

      this.weapon_animator = new Animator(this.weapon);
      this.weapon_animator.addKeyFrame('shoot', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
      }).addKeyFrame('shoot', {
        time: 50,
        position: createVector(-10, 0),
        rotation: 0,
      }).addKeyFrame('shoot', {
        time: 250,
        position: createVector(0, 0),
        rotation: 0,
      })


      this.player_animator = new Animator(this.player);
      this.player_animator.addKeyFrame('raise', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      }).addKeyFrame('raise', {
        time: levitatingRaiseTime,
        position: createVector(0, -60),
        rotation: 0,
        scale: 1
      })

      this.player.freeze();    //freeze controls
      this.player.disableGravity();


      post_processing.setFade(40);
      this.player.applyModifier(new LevitatingPlayerModifier(levitatingRaiseTime));
      soundManager.playPlayerRisingSound();

      const ball = this.player.ball;
      ball.set_visibility(false);


      this.player_animator.play('raise', false).addCallbackAtFinished(() => {
        this.weapon_enabled = true;

        const launchRocket = () => {
          this.weapon_animator.play('shoot', false, false);

          let rocketSource = new RectangularSource(this.player.pos.x + ((this.player.playerName === 'player2') ? -60 : 60), this.player.pos.y, 1, 5);
          if(this.player.playerName == 'player1')
            rocketSource.setVeloctyAngle(0);
          else
            rocketSource.setVeloctyAngle(PI);
            rocketSource.setRandomizeVelocityDirection(false);
            
            const particleSystem = new RocketParticleSystem(rocketSource, 1.3, 1, 1, false);
            particleSystem.disableGravity();
            particleSystem.start();
            particleSystem.playBurst();
            particleSystem.setPlayer(this.player);
            particleSystem.setDestroyParticleCallback((pos)=>{
              // console.log("HIT " + pos);
              rocketSource.position.y = this.player.pos.y + random(-50, 50); 

              const rectangularSource = new RectangularSource(pos.x, pos.y, 10, 10);
              rectangularSource.setAngleInterval(0, 2*PI);
              rectangularSource.setMagnitudeInterval(1, 20);
              const particleSystem = new GlowParticleSystem(rectangularSource, 100, 10, 1, false);
              particleSystem.disableGravity();
              particleSystem.start();
              particleSystem.playBurst();
              pickupActivator.particleSystemManager.addParticleSystem(particleSystem);

              soundManager.playRocketExplosion();
          }); 
          pickupActivator.particleSystemManager.addParticleSystem(particleSystem);
        }

        this.playerShoot_animator = new Animator(this.player);
        this.playerShoot_animator.addKeyFrame('shoot', {
          time: 0,
          position: createVector(0, 0),
          rotation: 0,
          scale: 1
        }).addKeyFrame('shoot', {
          time: 800,
          position: createVector(0, random(-50, 0)),
          rotation: 0,
          scale: 1,
          callOnceFunction: launchRocket
        }).addKeyFrame('shoot', {
          time: 800*2,
          position: createVector(0, random(0, 50)),
          rotation: 0,
          scale: 1,
          callOnceFunction: launchRocket
        }).addKeyFrame('shoot', {
          time: 800*3,
          position: createVector(0, random(-50, 0)),
          rotation: 0,
          scale: 1,
          callOnceFunction: launchRocket
        }).addKeyFrame('shoot', {
          time: 800*4,
          position: createVector(0, random(0, 50)),
          rotation: 0,
          scale: 1,
          callOnceFunction: launchRocket
        }).addKeyFrame('shoot', {
          time: 800*5,
          position: createVector(0, random(-50, 0)),
          rotation: 0,
          scale: 1,
          callOnceFunction: launchRocket
        })
        this.playerShoot_animator.play('shoot', false).addCallbackAtFinished(() => {
          if(this.player.playerName == 'player1'){
            ball.setPosition(this.player.pos.copy().add(50, 0));
            ball.setSpeed(this.shootIntensity);
          }
          else{
            ball.setPosition(this.player.pos.copy().add(-50, 0));
            ball.setSpeed(-this.shootIntensity);
          }
          ball.set_visibility(true);
          ball.applyModifier(new FireBallModifier(1000, null));
          this.player.unfreeze();
          this.player.enableGravity();
          post_processing.resetFade();
          pickupActivator.endEffect();

          soundManager.playFireballSound();
        })

      });


    }

    effectUpdate(){
      this.player_animator.update();
      this.playerShoot_animator?.update();
      this.weapon_animator.update();

      this.timer?.update();
    }

    effectShow(){
      if(!this.weapon_enabled) return;

      layer_manager.addAsset(101, {
        'img' : WEAPON_IMG,
        'img_pos': createVector(65, 0).add(this.weapon.pos),
        'scale' : 0.18,
        'pos': this.player.pos,
        'rot': this.weapon.rot,
        'invertX': this.player.playerName == 'player2'
      }).addAsset(2, {
        'img' : ROBOT_PART1,
        'img_pos': createVector(12, 12),
        'scale' : 0.2,
        'pos': this.player.pos,
        'rot': 0,
        'invertX': this.player.playerName == 'player2'
      }).addAsset(2, {
        'img' : ROBOT_PART2,
        'img_pos': createVector(16, 16),
        'scale' : 0.56,
        'pos': this.player.pos,
        'rot': ((this.player.playerName == 'player2') ? 0.5 : -0.5),
        'invertX': this.player.playerName == 'player1'
      })
    }


}