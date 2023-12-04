


class StrongPlayer extends Player {

    constructor(x, y, terrain, ball, pickupActivator, playerName = 'player1') {
      super(x, y, 25, {
          'head': {'img' : PLAYER3_HEAD_IMG, 'img_pos': createVector(0 + 4, -10)},
          'body': {'img' : PLAYER3_BODY_IMG, 'img_pos': createVector(-8 + 4, 9)},
          'foot': {'img' : PLAYER3_FOOT_IMG, 'img_pos': createVector(-11 + 4, 25)}
      },terrain, ball, pickupActivator, playerName);


      //SPECIFIC parameters for jumpy player
      this.PLAYER_SHOOT_INTENSITY = 15;
      this.shoot_angle = PI/3 - PI/9;    //Lower the shoot angle for consistent shoot arc
    }


    show() {
      super.show();
      layer_manager.addAsset(1, {
        'img' : this.head.img,
        'img_pos': this.head.img_pos.copy().mult(this.scale),
        'scale' : this.size*0.4/100 * this.head.scale,
        'pos': this.head.pos,
        'rot': this.head.rot,
        'invertX': this.inverted
      }).addAsset(2, {
        'img' : this.body.img,
        'img_pos': this.body.img_pos.copy().mult(this.scale),
        'scale': this.size*0.38/100 * this.body.scale,
        'pos': this.body.pos,
        'rot': this.body.rot,
        'invertX': this.inverted
      }).addAsset(1, {
        'img' : this.foot.img,
        'img_pos': this.foot.img_pos.copy().mult(this.scale),
        'scale': this.size*0.7/100 * this.foot.scale,
        'pos': this.foot.pos,
        'rot': this.foot.rot,
        'invertX': this.inverted
      })
    }

}