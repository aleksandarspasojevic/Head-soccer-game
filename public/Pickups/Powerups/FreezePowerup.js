


class FreezePowerup extends Powerup {
    constructor(img, pos) {
      super("freeze", pos.x, pos.y, 0, img);

      this.pickupCollider = new CircleCollider(this.pos.copy(), 20, createVector(0, 0));
      this.freezeDuration = 1500; 
      
      
      this.pickup_animator = new Animator(this);
      this.pickup_animator.addKeyFrame('idle', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 0.48
      }).addKeyFrame('idle', {
        time: 200,
        position: createVector(0, 0),
        rotation: 0.3,
        scale: 0.53
      })
      .addKeyFrame('idle', {
        time: 400,
        position: createVector(0, 5),
        rotation: -0.3,
        scale: 0.53
      })
      .addKeyFrame('idle', {
        time: 600,
        position: createVector(0, 0),
        rotation: 0.3,
        scale: 0.53
      })
      .addKeyFrame('idle', {
        time: 800,
        position: createVector(0, 0),
        rotation: 0,
        scale: 0.48
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

            const glowRadius = map(this.scale, 0.4, 0.5, 100, 160);           //Glow radius changes respectively to scale
            for(let i = glowRadius; i > 20; i-=6){
              fill(100, 200, 200, map(i, glowRadius, 0, 0, 12))
              ellipse(this.pos.x, this.pos.y, i, i)
            }
            pop()
          }
        })
        
        // image(this.img, this.pos.x, this.pos.y, this.size, this.size);
      }
    }

    effectInit(){
      // Implement freeze power-up specific behavior.
      // console.log("FREEZE EFFECT");
      const pickupActivator = this.player.pickupActivator;
     
      this.player.getOpponentPlayer().applyModifier(new FreezeModifier(this.freezeDuration, ICE_CUBE));
      setTimeout(()=>{
        pickupActivator.endEffect();
      }, this.freezeDuration);


    }

}