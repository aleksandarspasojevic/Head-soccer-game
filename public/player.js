PLAYER_SIZE = 100
MAX_PLAYER_SPEED = 4

class Player {
    constructor(x, y, size, imgs, terrain, ball, playerName = 'player1') {
      this.pos = createVector(x, y);
      this.size = size;
      this.width = size * 2   //width and height of player
      this.height = size * 3
      this.velocity = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.jumpStrength = 8 ;
      this.images = imgs;
      this.terrain = terrain
      this.ball = ball
      this.playerName = playerName

      // player sub-objects 
      this.head = {
        ...this.images.head, 
        pos: this.pos.copy(), 
        rot: 0, 
        scale: 1
      }

      this.body = {
        ...this.images.body, 
        pos: this.pos.copy(), 
        rot: 0, 
        scale: 1
      }

      this.foot = {
        ...this.images.foot, 
        pos: this.pos.copy(), 
        rot: 0, 
        scale: 1
      }

      //HARDCODED constants as OFFSETS for colliders 
      // Define colliders
      this.headCollider = new CircleCollider(this.pos.copy(), 20, createVector(0, -15));
      this.bodyCollider = new RectCollider(this.pos.copy(), this.width*0.8, this.height/3, this.images.foot.img_pos.copy().add(createVector(0, -5)));

      // Foot colliders are defined for each player separatelly
      if(this.playerName == 'player1')
        this.footCollider = new RectCollider(this.pos.copy(), this.width*0.8, this.height/2, this.images.foot.img_pos.copy().add(createVector(20, -5)));
      else
        this.footCollider = new RectCollider(this.pos.copy(), this.width*0.8, this.height/2, this.images.foot.img_pos.copy().add(createVector(-20, -5)));


      //ANIMATIONS keyframes
      this.player_animator = new Animator(this.head);
      this.head_animator = new Animator(this.head);
      this.foot_animator = new Animator(this.foot);

      this.player_animator.addKeyFrame('idle', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      }).addKeyFrame('idle', {
        time: 300,
        position: createVector(0, -3),
        rotation: 0,
        scale: 1.02
      })
      .addKeyFrame('idle', {
        time: 600,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      })

      this.foot_animator.addKeyFrame('shoot', {
        time: 0,
        rotation: 0,
        scale: 1
      }).addKeyFrame('shoot', {
        time: 150,
        position: createVector(0, 0),
        rotation: -PI/3.5,
        scale: 1
      })
      .addKeyFrame('shoot', {
        time: 180,
        rotation: -PI/10,
        scale: 1
      })
      .addKeyFrame('shoot', {
        time: 370,
        rotation: 0,
        scale: 1
      })


      this.head_animator.addKeyFrame('shoot', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      }).addKeyFrame('shoot', {
        time: 150,
        position: createVector(0, 0),
        rotation: PI/8,
        scale: 1
      }).addKeyFrame('shoot', {
        time: 180,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      })
      
      this.player_animator.play('idle', true);
    }
  
    show() {
      layer_manager.addAsset(0, {
        'img' : this.head.img,
        'img_pos': this.head.img_pos,
        'scale' : this.size/100 * this.head.scale,
        'pos': this.head.pos,
        'rot': this.head.rot
      }).addAsset(1, {
        'img' : this.body.img,
        'img_pos': this.body.img_pos,
        'scale': this.size/100 * this.body.scale,
        'pos': this.body.pos,
        'rot': this.body.rot
      }).addAsset(0, {
        'img' : this.foot.img,
        'img_pos': this.foot.img_pos,
        'scale': this.size/100 * this.foot.scale,
        'pos': this.foot.pos,
        'rot': this.foot.rot
      }).addAsset(0, {    //debug colliders
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
      }).addAsset(-1, {
        "draw": () => {    //ball shadowing
          push()
          let height = this.terrain.bottomBound - this.height/2 - this.pos.y
          // print(height)
          translate(this.pos.x, this.terrain.bottomBound )
          noStroke()
          let ball_shadow_scale = constrain(map(height, 80, 0, 0.0, 1), 0,1)
          fill(0, 0, 0, 80 * ball_shadow_scale)
          ellipse(0, 0, 2 * this.size * ball_shadow_scale, this.size *0.8 * ball_shadow_scale)
          pop()
        }
      })
      
      // Draw colliders for debugging
      // this.bodyCollider.show();
      // this.headCollider.show();
    }
  
    update() {
      let deltatime = 1 / frameRate()
      // Apply acceleration to velocity
      this.acc.y = GRAVITY;
      this.velocity.add(this.acc.mult(60 * deltatime));
  
      // Apply velocity to position, taking terrain into account
      this.pos.add(this.velocity.mult(60 * deltatime));
  
      // Player is on ground, his velocity is 0
      if(this.isOnGround()) this.velocity.y = 0
      
      // Constrain max speed on x axis
      if(abs(this.velocity.x) > PLAYER_SPEED) this.velocity.x *= PLAYER_SPEED /abs(this.velocity.x)

      // Check collision with ball
      if (this.headCollider.inCollision(this.ball.collider)) {
        // console.log("head");

        var dir = p5.Vector.sub(this.ball.collider.position, this.headCollider.position);
        var d = dir.mag();
        
        dir.normalize();

        var corr = (this.ball.collider.radius + this.headCollider.radius - d);
        this.ball.collider.position.add(dir.copy().mult(corr));

        let impactAngle = this.ball.getImpactAngle(this.headCollider);
        this.ball.setVelocityFromAngle(impactAngle, this.ball.velocity.mag() + this.velocity.mag());
        
        this.head_animator.play('shoot')
      }

      // Check collision with other player 
      // if (this.headCollider.inCollision(this.ball.collider)) {

      // }

      if (this.bodyCollider.inCollision(this.ball.collider)) {
        // console.log("BODY")

        let impactAngle = this.ball.getImpactAngle(this.bodyCollider);
        this.ball.setVelocityFromAngle(impactAngle, this.ball.velocity.mag() + this.velocity.mag() * 1.05);
      }

      // Constrain player position within terrain bounds
      this.pos.set(
        constrain(this.pos.x, this.terrain.leftBound + this.width/2, this.terrain.rightBound - this.width/2),
        constrain(this.pos.y, this.terrain.topBound, this.terrain.bottomBound - this.height/2)
      );
      
      // All players children objects should be poisiton updated by physics engine
      this.head.pos.set(this.pos)
      this.body.pos.set(this.pos)
      this.foot.pos.set(this.pos)


      // Update the animator  (it animates player children relatively to physics engine calculations)
      this.head_animator.update();
      this.foot_animator.update();
      this.player_animator.update();


      // UPDATE COLLIDERS poistions
      this.headCollider.setPosition(this.pos)
      this.bodyCollider.setPosition(this.pos)
      this.footCollider.setPosition(this.pos)

    }
  
    shootBall(shoot_angle = PI/3){
      if (this.footCollider.inCollision(this.ball.collider)) {     //ball is in field for shoot
        console.log("SHOOT")

        this.ball.setVelocityFromAngle(shoot_angle, PLAYER_SHOOT_INTENSITY);
      }
    }
  
    jump() {
      // Only jump if player is on the ground
      if (this.isOnGround()) {
        this.velocity.y = -this.jumpStrength;
      }
    }
  
    applyForce(force) {
      // Apply force to acceleration
      this.acc.add(force);
    }
  
    isOnGround() {
      return this.pos.y + this.height/2 + 1> this.terrain.bottomBound;
    }

    
    setHorizontalAcceleration(acc){
      this.acc.x = acc
    }

    setPosition(pos){
      this.pos.set(pos);
    }

    setVelocity(vel) {
      this.velocity = vel;
    }

    setSpeedX(speed){
      this.velocity.x = speed;
    }

  }