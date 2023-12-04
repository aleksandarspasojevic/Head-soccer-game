



class LevitatingPlayerModifier extends Modifier {
    constructor(duration) {
      super(duration); // Call the constructor of the parent class (Modifier)

      this.modifierManager = null;
    }
  
    
    applyModifier(player, modifierManager) {
      super.applyModifier(player); // Call the applyModifier method of the parent class (Modifier)
      this.modifierManager = modifierManager;
    
      //Apply changes to the player


      this.playerHead_animator = new Animator(this.player.head);
      this.playerHead_animator.addKeyFrame('shake', {         //grow animation
        time: 0,
        position:createVector(-2, 0),
        scale: 1,
      }).addKeyFrame('shake', {
        time: this.duration*0.06,
        position:createVector(0, -2),
        scale: 1.3
      });


      this.playerFoot_animator = new Animator(this.player.foot);
      this.playerFoot_animator.addKeyFrame('footShake', {         //grow animation
        time: 0,
        position:createVector(0, 0),
        scale: 1,
      }).addKeyFrame('footShake', {
        time: this.duration * 0.95,
        position:createVector(0, 40),
        rotation: player.playerName == 'player1' ? 0.3 : -0.3,                        //Animation key points differs in symetry for 2 players
        scale: 1.5
      }).addKeyFrame('footShake', {
        time: this.duration,
        position:createVector(0, 0),
        scale: 1
      });


      this.playerBody_animator = new Animator(this.player.body);
      this.playerBody_animator.addKeyFrame('bodyShake', {         //grow animation
        time: 0,
        position:createVector(0, 0),
        scale: 1,
      }).addKeyFrame('bodyShake', {
        time: this.duration * 0.95,
        position:createVector(0, 0),
        rotation: player.playerName == 'player1' ? 0.3 : -0.3,                  //Animation key points differs in symetry for 2 players
        scale: 1.5
      }).addKeyFrame('bodyShake', {
        time: this.duration,
        position:createVector(0, 0),
        scale: 1
      });

      this.playerHead_animator.play('shake', true, true);
      this.playerFoot_animator.play('footShake', true, true);
      this.playerBody_animator.play('bodyShake', true, true);

      //Instantiate particle system effects 
      const particleSystemManager = this.player.pickupActivator.particleSystemManager;

      const rectangularSource = new RectangularSource(this.player.pos.x, this.player.pos.y, 200, 200);
      rectangularSource.setAngleInterval(0, 2*PI);
      rectangularSource.setMagnitudeInterval(1, 20);
      const particleSystem = new GlowParticleSystem(rectangularSource, 10, 20, 3, false);
      particleSystem.disableGravity();
      particleSystem.start();
      particleSystem.playBurst();
      particleSystemManager.addParticleSystem(particleSystem);


    }
  
    removeModifier(player) {
      super.removeModifier(player); // Call the removeModifier method of the parent class (Modifier)
    
      //Revert changes on the player
    }
  
    update() {
      super.update(); 
      this.playerHead_animator.update();
      this.playerFoot_animator.update();
      this.playerBody_animator.update();
    }
  
    show() {
      super.show(); 
      layer_manager.addAsset(0, {   
        "draw": () => {
          push()
          noStroke();
          fill(255, 0, 0, 10)
          rectMode(CENTER);

          let size = 300;
          for(let i = size; i > 20; i-=12){
            fill(255, 255, 100, map(i, size, 0, 0, 30))
            ellipse(this.player.pos.x, this.player.pos.y, i, i)
          }

          pop()
        }
      })

      
    }
  }
  