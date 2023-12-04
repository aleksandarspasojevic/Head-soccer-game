

FRICTION_COEFFICIENT = 0.01
ROTATION_COEFFICIENT = 0.1

val = 0  //rot val

class Ball {
    constructor(x, y, size, ball_img, terrain, goalpost_left, goalpost_right) {
      this.pos = createVector(x, y);
      this.size = size;
      this.ball_img = ball_img
      this.terrain = terrain
      this.goalpost_left = goalpost_left
      this.goalpost_right = goalpost_right
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.defaultBouncines = 0.8;
      this.defaultDynamicFriction = 0.97;
      this.bounciness = this.defaultBouncines;
      this.dynamicFriction = this.defaultDynamicFriction;
      this.collider = new CircleCollider(this.pos, this.size*1.25);
      this.visibility = true;
      this.trail_effect = new TrailEffect(this, 40, this.size*2.5);

      //modifier manager
      this.modifierManager = new ModifierManager(this);

      this.ball_to_center();
    }
  
    show() {
      if(!this.visibility) return;
      this.trail_effect.show();
      layer_manager.addAsset(10, {
        'img' : this.ball_img,
        'img_pos': createVector(0, 0),
        'scale' : this.size/100,
        'pos': this.pos,
        'rot': val
      }).addAsset(0, {
        "draw": () => {    //ball shadowing
          push()
          let height = this.terrain.bottomBound + this.size - this.pos.y
          // print(height)
          translate(this.pos.x, this.terrain.bottomBound)
          noStroke()
          let ball_shadow_scale = constrain(map(height, 100, 0, 0.1, 1), 0,1)
          fill(0, 0, 0, 100 * ball_shadow_scale)
          ellipse(0, 2, 3*this.size * ball_shadow_scale, this.size * ball_shadow_scale)
          pop()
        }
      }).addAsset(10, {
        "draw": () => {    //debug colliders
          // push()
          // stroke(0, 255, 0)
          // noFill()
          // ellipse(this.collider.position.x, this.collider.position.y, this.collider.radius * 2, this.collider.radius * 2)
          // pop()
        }
      })
      // val +=0.06

      this.modifierManager.show();
    }
  
    update(terrain, player1, player2) {
      if(!this.visibility){
        this.trail_effect.clearTrail();
        return;
      };
      this.trail_effect.update();
      // let deltatime = deltaTime * 60/ 1000;
      // Apply gravity
      this.acceleration.y =  GRAVITY*0.3 * deltatime;

      if(abs(this.velocity.y) < 0.3 && abs(this.pos.y - this.terrain.bottomBound)-this.collider.radius < 0.3) {
        this.velocity.y = 0;
        // console.log(this.velocity.y);
        this.velocity.x *= this.dynamicFriction;
      }

      // Apply velocity to position
      this.velocity.add(this.acceleration.copy().mult(deltatime));
      this.pos.add(this.velocity.copy().mult(deltatime));


      // HANDLE GoalPost collision
      if (this.goalpost_left.collider.inCollision(this.collider)) {
        let impactAngle = this.getImpactAngle(this.goalpost_left.collider);
        goalpost_left.goalpost_animator.play("frame_shoot")
        this.setVelocityFromAngle(impactAngle, this.velocity.mag());
      }

      if (this.goalpost_right.collider.inCollision(this.collider)) {
        let impactAngle = this.getImpactAngle(this.goalpost_right.collider);
        goalpost_right.goalpost_animator.play("frame_shoot")
        this.setVelocityFromAngle(impactAngle, this.velocity.mag());
      }

      // Check if ball is in the goal 
      if (this.goalpost_left.inside_collider.inCollision(this.collider)) {
        score.player2_scored()

        this.set_visibility(false);
        setTimeout(()=>{
          this.set_visibility(true);
          this.ball_to_center()
        }, 1500);
      }

      if (this.goalpost_right.inside_collider.inCollision(this.collider)) {
        score.player1_scored()

        this.set_visibility(false);
        setTimeout(()=>{
          this.set_visibility(true);
          this.ball_to_center()
        }, 1500);
      }
      

      this.handleTerrainCollision();
      this.modifierManager.update();
    }

    
    handleTerrainCollision() {
      // Check if ball is within bounds of terrain
      if (this.pos.y + this.collider.radius > this.terrain.bottomBound) {
        // Check if the ball has collided with the bottom boundary of the terrain
        this.pos.y = this.terrain.bottomBound - this.collider.radius;
        this.velocity.y *= -this.bounciness * this.terrain.FRICTION_COEFFICIENT;

        //Play impact sound if ball is going fast enough
        if(abs(this.velocity.y) > 1.5) soundManager.playBallTerrainImpactSound();

      } else if (this.pos.y - this.collider.radius < this.terrain.topBound) {
        // Check if the ball has collided with the top boundary of the terrain
        this.pos.y = this.terrain.topBound + this.collider.radius;
        this.velocity.y *= -this.bounciness * this.terrain.FRICTION_COEFFICIENT;
      }
    
      if (this.pos.x + this.collider.radius > this.terrain.rightBound) {
        // Check if the ball has collided with the right boundary of the terrain
        this.pos.x = this.terrain.rightBound - this.collider.radius;
        this.velocity.x *= -this.bounciness * this.terrain.FRICTION_COEFFICIENT;
      } else if (this.pos.x - this.collider.radius < this.terrain.leftBound) {
        // Check if the ball has collided with the left boundary of the terrain
        this.pos.x = this.terrain.leftBound + this.collider.radius;
        this.velocity.x *= -this.bounciness * this.terrain.FRICTION_COEFFICIENT;
      }
    }

    //effects part
    applyModifier(modifier) {
      return this.modifierManager.applyModifier(modifier);
    }


    set_visibility(visibility){
      this.visibility = visibility;
    } 
    
    ball_to_center(){
      this.pos.set(createVector(0, 0))
      this.velocity.set(createVector(random(-4, 4), 0))
    }
   
    setSpeed(speed) {
      this.velocity.set(speed, 0);
    }

    setPosition(position){
      this.pos.set(position);
    }

    getImpactAngle(collider) {
      let distX = this.pos.x - collider.position.x;
      let distY = this.pos.y - collider.position.y;
      let angle = atan2(distY, distX);
      return angle;
    }
  
    setVelocityFromAngle(angle, speed) {
      this.velocity.x = cos(angle) * speed;
      this.velocity.y = sin(angle) * speed;
    }

    setHorizontalAcceleration(val){
      this.acceleration.x = val;
    }

    setBounciness(bounciness){
      this.bounciness = bounciness;
    }

    restoreDefaultBounciness(){
      this.bounciness = this.defaultBouncines;
    }

    setDynamicFriction(friction){
      this.dynamicFriction = friction;
    }

    restoreDefalutDynamicFriction(){
      this.dynamicFriction = this.defaultDynamicFriction;
    }

  }
  