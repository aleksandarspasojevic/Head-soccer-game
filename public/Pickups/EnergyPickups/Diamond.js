



class Diamond extends Pickup {
    constructor(img, pos) {
      super("diamond", pos.x, pos.y, 0, img);
      this.scale = 0.4;     //default diamond scale
      this.pickupCollider = new CircleCollider(this.pos.copy(), 20, createVector(0, 0));

      this.diamond_animator = new Animator(this);

      this.diamond_animator.addKeyFrame('idle', {
        time: 0,
        position: createVector(0, 0),
        scale: 0.4
      }).addKeyFrame('idle', {
        time: 400,
        position: createVector(0, -15),
        scale: 0.5
      })
      .addKeyFrame('idle', {
        time: 550,
        position: createVector(0, 0),
        scale: 0.4
      })

      this.diamond_animator.play('idle', false, true);

    }

    update(){
      this.diamond_animator.update();
    }

    show(){
      if (this.active) {
        layer_manager.addAsset(4, {    
          "draw": () => {                //GLOW effect
            push()                      
            noStroke();

            const glowRadius = map(this.scale, 0.4, 0.5, 150, 300);           //Glow radius changes respectively to scale
            for(let i = glowRadius; i > 20; i-=6){
              fill(0, 150, 255, map(i, glowRadius, 0, 0, 12))
              ellipse(this.pos.x, this.pos.y, i, i)
            }
            pop()
          }
        }).addAsset(5, {
          'img' : this.img,
          'img_pos': createVector(0,0),
          'scale': this.scale,
          'pos': createVector(this.pos.x, this.pos.y),
          'rot': null
        })
        
      }
    }


    onCollect(player){
      super.onCollect(player);

      //Diamond collected
      // console.log("DIAMOND COLLECTED")

      this.player.gainEnergy(MAX_PLAYER_ENERGY * 0.5);               //DIAMOND collecting gains players energy by 50%
    }
  

}