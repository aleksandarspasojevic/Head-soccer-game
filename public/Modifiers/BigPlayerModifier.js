



class BigPlayerModifier extends Modifier {
    constructor(duration) {
      super(duration); // Call the constructor of the parent class (Modifier)

      this.modifierManager = null;
      this.enlargingFator = 2;
    }
  
    
    applyModifier(player, modifierManager) {
      super.applyModifier(player); // Call the applyModifier method of the parent class (Modifier)
      this.modifierManager = modifierManager;
    
      //Apply changes to the player
    //   this.player.setScale(1.8);


      this.playerScale_animator = new Animator(this.player);
      this.playerScale_animator.addKeyFrame('grow', {         //grow animation
        time: 0,
        scale: 1,
      }).addKeyFrame('grow', {
        time: this.duration*0.1,
        scale: this.enlargingFator*1.5
      }).addKeyFrame('grow', {
        time: this.duration*0.11,
        scale: this.enlargingFator*0.7
      }).addKeyFrame('grow', {
        time: this.duration*0.12,
        scale: this.enlargingFator
      })
      .addKeyFrame('grow', {
        time: this.duration,
        scale: this.enlargingFator
      })

      this.playerScale_animator.play('grow', true);

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
      this.player.setScale(1);
    }
  
    update() {
      super.update(); 
      this.playerScale_animator.update();
    }
  
    show() {
      super.show(); 
      layer_manager.addAsset(-1, {    //debug colliders
        "draw": () => {
          push()
          noStroke();
          fill(255, 0, 0, 10)
          rectMode(CENTER);

          for(let i = 400; i > 20; i-=12){
            fill(255, 0, 0, map(i, 400, 0, 0, 30))
            ellipse(this.player.pos.x, this.player.pos.y, i, i)
          }

          pop()
        }
      })
    }
  }
  