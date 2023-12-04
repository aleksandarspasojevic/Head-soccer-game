

class FreezeModifier extends Modifier {
    constructor(duration, img) {
      super(duration); // Call the constructor of the parent class (Modifier)
      this.img = img;
      this.iceCollider = null;

      this.modifierManager = null;
    }
  
    
    applyModifier(player, modifierManager) {
      super.applyModifier(player); // Call the applyModifier method of the parent class (Modifier)
      this.modifierManager = modifierManager;
    
      this.iceCollider = new RectCollider(this.player.pos.copy(), 70, 100);

      //Apply changes to the player
      this.player.freeze();
    }
  
    removeModifier(player) {
      super.removeModifier(player); // Call the removeModifier method of the parent class (Modifier)
    
      //Revert changes on the player
      this.player.unfreeze();

      //ice breaking particle effect
      const bottomTerrainBound = this.player.terrain.bottomBound;
      const rectangularSource = new RectangularSource(this.player.pos.x, this.player.pos.y, 50, 150);
      const particleSystem = new ParticleSystem(rectangularSource, 1, 20, 1, false);
      particleSystem.enableCollisionDetection(bottomTerrainBound, 0.5);
      particleSystem.start();
      particleSystem.playBurst();

      this.modifierManager.particleSystemManager.addParticleSystem(particleSystem);
      
      soundManager.playIceBreak();
    }
  
    update() {
      super.update(); 

      this.iceCollider.setPosition(this.player.pos);     //Update collider position
      //Get required objects with player reference
      const ball = this.player.ball;

      if (this.iceCollider.inCollision(ball.collider)) {               //ball interracts with ice cube
        let impactAngle = ball.getImpactAngle(this.iceCollider);
        ball.setVelocityFromAngle(impactAngle, ball.velocity.mag());
      }

    }
  
    show() {
      super.show(); 


      layer_manager.addAsset(3, {
            'img' : this.img,
            'transparency': 80,
            'img_pos': this.player.foot.img_pos.copy().sub(10, 30),
            'scale': this.player.size/100 * 1.5,
            'pos': this.player.foot.pos,
            'rot': 0
        }).addAsset(100, {    //debug colliders
            "draw": () => {
            //   push()
            //   stroke(0, 255, 0)
            //   noFill()
            //   rectMode(CENTER);
            //   rect(this.iceCollider.position.x, this.iceCollider.position.y, this.iceCollider.width, this.iceCollider.height)
            //   pop()
            }
          })

    }
  }
  