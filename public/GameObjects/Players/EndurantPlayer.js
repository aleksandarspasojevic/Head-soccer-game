


class EndurantPlayer extends Player {
    constructor(x, y, terrain, ball, pickupActivator, playerName = 'player1') {
      super(x, y, 25, {
        'head': {'img' : PLAYER4_HEAD_IMG, 'img_pos': createVector(0, -10)},
        'body': {'img' : PLAYER4_BODY_IMG, 'img_pos': createVector(-3, 9)},
        'foot': {'img' : PLAYER4_FOOT_IMG, 'img_pos': createVector(0, 29)}
      },terrain, ball, pickupActivator, playerName);

      //SPECIFIC parameters for endurant player
      this.energyRepairRate = 10/60;
      this.energyRunDrainRate = 2/60;
      this.energyJumpDrainAmount = 0.5;
      this.energyShootDrainAmount = 1;

      this.PLAYER_SPEED = 5;  //Endurant player is a bit faster than default player

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
        'scale': this.size*0.4/100 * this.body.scale,
        'pos': this.body.pos,
        'rot': this.body.rot,
        'invertX': this.inverted
      }).addAsset(1, {
        'img' : this.foot.img,
        'img_pos': this.foot.img_pos.copy().mult(this.scale),
        'scale': this.size*0.6/100 * this.foot.scale,
        'pos': this.foot.pos,
        'rot': this.foot.rot,
        'invertX': this.inverted
      })
    }

  }