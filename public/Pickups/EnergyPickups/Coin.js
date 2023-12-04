


class Coin extends Pickup {
    constructor(img, pos) {
      super("coin", pos.x, pos.y, 0, img);  
      this.pickupCollider = new CircleCollider(this.pos.copy(), 20, createVector(0, 0));       //Redefine specific collider
      this.scale = 0.5;         //default coin scale is 0.5


      this.coin_animator = new Animator(this);

      this.coin_animator.addKeyFrame('idle', {
        time: 0,
        position: createVector(0, 0),
        scale: 0.48
      }).addKeyFrame('idle', {
        time: 300,
        position: createVector(0, -5),
        scale: 0.53
      })
      .addKeyFrame('idle', {
        time: 500,
        position: createVector(0, 0),
        scale: 0.48
      })

      this.coin_animator.play('idle', false, true);

    }

    update(){
      this.coin_animator.update();
    }

    show(){
      if (this.active) {
        layer_manager.addAsset(100, {    
          "draw": () => {                //GLOW effect
            push()
            noStroke();

            for(let i = 150; i > 20; i-=6){
              fill(255, 255, 100, map(i, 150, 0, 0, 25))
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

      //Coin collected
      // console.log("COIN COLLECTED")
      this.player.gainEnergy(MAX_PLAYER_ENERGY * 0.2);                //COIN collecting gains players energy by 20%
    }
    

}