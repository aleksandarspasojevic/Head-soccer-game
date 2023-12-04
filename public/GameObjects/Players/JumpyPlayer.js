




class JumpyPlayer extends Player {
    constructor(x, y, terrain, ball, pickupActivator, playerName = 'player1') {
        super(x, y, 25, {
            'head': {'img' : PLAYER2_HEAD_IMG, 'img_pos': createVector(0, -10)},
            'body': {'img' : PLAYER2_BODY_IMG, 'img_pos': createVector(6, 11)},
            'foot': {'img' : PLAYER2_FOOT_IMG, 'img_pos': createVector(-4, 26)}
        },terrain, ball, pickupActivator, playerName);

        //SPECIFIC parameters for jumpy player
        this.defaultJumpStrength = 15;
        this.jumpStrength = this.defaultJumpStrength;
        this.acc = createVector(0, GRAVITY*1.7);        //On jumpy player greater gravity pull is applied for more responsive landing time
    }


    show() {
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
        }).addAsset(1, {
          "draw": () => {    //ball shadowing
            if(!this.terrain) return;
  
            push()
            const terrainHeight = this.terrain.terrainHeightAt(this.pos.x)
            let height = terrainHeight - this.height/2 - this.pos.y
            // print(height)
            translate(this.pos.x, terrainHeight)
            noStroke()
            let ball_shadow_scale = constrain(map(height, 80, 0, 0.0, 1), 0,1)
            fill(0, 0, 0, 80 * ball_shadow_scale)
            ellipse(0, 0, 2 * this.size * ball_shadow_scale, this.size *0.8 * ball_shadow_scale)
            pop()
          }
        })
  
        this.itemCollection?.show();
        this.modifierManager?.show();
  
        
        // Draw colliders for debugging
        // this.bodyCollider.show();
        // this.headCollider.show();
      }

  }