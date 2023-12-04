



class FanPowerup extends Powerup {
    constructor(img, pos) {
      super("wind", pos.x, pos.y, 0, img);

      this.pickupCollider = new CircleCollider(this.pos.copy(), 20, createVector(0, 0));
      this.windDuration = 5000;  



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
        time: 550,
        position: createVector(0, 0),
        rotation: 2*PI,
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
            // fill(100);
            // stroke(255)
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
              fill(200, 255, 140, map(i, 150, 0, 0, 25))
              ellipse(this.pos.x, this.pos.y, i, i)
            }
            pop()
          }
        })
        
      }
    }
  
  
    effectInit(){
       // Implement fan power-up specific behavior.
      
       if(this.player.playerName == 'player1'){
        leftFan.enable();

        setTimeout(()=>{
          leftFan.disable();
        }, this.windDuration);

      }else{
        rightFan.enable();

        setTimeout(()=>{
          rightFan.disable();
        }, this.windDuration);

      }
      
      setTimeout(()=>{
        pickupActivator.endEffect();
      }, this.windDuration);

    }


}