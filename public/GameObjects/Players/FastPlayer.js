


class FastPlayer extends Player {
    constructor(x, y, terrain, ball, pickupActivator, playerName = 'player1') {
      super(x, y, 25, {
        'head': {'img' : PLAYER1_HEAD_IMG, 'img_pos': createVector(0, -10)},
        'body': {'img' : PLAYER1_BODY_IMG, 'img_pos': createVector(-5, 15)},
        'foot': {'img' : PLAYER1_FOOT_IMG, 'img_pos': createVector(4, 26)}
      },terrain, ball, pickupActivator, playerName);

      //SPECIFIC parameters for fast player
      this.PLAYER_SPEED = 7;
    }


    show() {
        super.show();
        layer_manager.addAsset(1, {
          'img' : this.head.img,
          'img_pos': this.head.img_pos.copy().mult(this.scale),
          'scale' : this.size/100 * this.head.scale,
          'pos': this.head.pos,
          'rot': this.head.rot,
          'invertX': this.inverted
        }).addAsset(2, {
          'img' : this.body.img,
          'img_pos': this.body.img_pos.copy().mult(this.scale),
          'scale': this.size/100 * this.body.scale,
          'pos': this.body.pos,
          'rot': this.body.rot,
          'invertX': this.inverted
        }).addAsset(1, {
          'img' : this.foot.img,
          'img_pos': this.foot.img_pos.copy().mult(this.scale),
          'scale': this.size/100 * this.foot.scale,
          'pos': this.foot.pos,
          'rot': this.foot.rot,
          'invertX': this.inverted
        }).addAsset(100, {    //debug colliders
          "draw": () => {
            // push()
            // stroke(0, 255, 0)
            // noFill()
            // rectMode(CENTER);
            // ellipse(this.headCollider.position.x, this.headCollider.position.y, this.headCollider.radius * 2, this.headCollider.radius * 2)
            // rect(this.bodyCollider.position.x, this.bodyCollider.position.y, this.bodyCollider.width, this.bodyCollider.height)
            // rect(this.footCollider.position.x, this.footCollider.position.y, this.footCollider.width, this.footCollider.height)
  
            // rect(this.pos.x, this.pos.y,this.width , this.height)
            // pop()
          }
        })
      }

  }