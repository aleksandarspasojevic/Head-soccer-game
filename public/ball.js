

FRICTION_COEFFICIENT = 0.01
ROTATION_COEFFICIENT = 0.1

val = 0  //rot val

class Ball {
    constructor(x, y, size, ball_img, terrain, goalpost_left, goalpost_right) {
      this.position = createVector(x, y);
      this.size = size;
      this.ball_img = ball_img
      this.terrain = terrain
      this.goalpost_left = goalpost_left
      this.goalpost_right = goalpost_right
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.bounciness = 0.8
      this.collider = new CircleCollider(this.position, this.size*1.25);
    }
  
    show() {
      layer_manager.addAsset(50, {
        'img' : this.ball_img,
        'img_pos': createVector(0, 0),
        'scale' : this.size/100,
        'pos': this.position,
        'rot': val
      }).addAsset(0, {
        "draw": () => {    //ball shadowing
          push()
          let height = this.terrain.bottomBound + this.size - this.position.y
          // print(height)
          translate(this.position.x, this.terrain.bottomBound)
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
    }
  
    update(terrain, player1, player2) {
      let deltatime = 1 / frameRate()
      // Apply gravity
      this.acceleration.set(0, GRAVITY*0.3);
    
      // Apply velocity to position
      this.velocity.add(this.acceleration.mult(60 * deltatime));
      this.position.add(this.velocity.mult(60 * deltatime));

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
        this.ball_to_center()
      }

      if (this.goalpost_right.inside_collider.inCollision(this.collider)) {
        score.player1_scored()
        this.ball_to_center()
      }
      

      this.handleTerrainCollision();
    
    }

    
    handleTerrainCollision() {
      // Check if ball is within bounds of terrain
      if (this.position.y + this.collider.radius > this.terrain.bottomBound) {
        // Check if the ball has collided with the bottom boundary of the terrain
      this.position.y = this.terrain.bottomBound - this.collider.radius;
        this.velocity.y *= -this.bounciness;
      } else if (this.position.y - this.collider.radius < this.terrain.topBound) {
        // Check if the ball has collided with the top boundary of the terrain
        this.position.y = this.terrain.topBound + this.collider.radius;
        this.velocity.y *= -this.bounciness;
      }
    
      if (this.position.x + this.collider.radius > this.terrain.rightBound) {
        // Check if the ball has collided with the right boundary of the terrain
        this.position.x = this.terrain.rightBound - this.collider.radius;
        this.velocity.x *= -this.bounciness;
      } else if (this.position.x - this.collider.radius < this.terrain.leftBound) {
        // Check if the ball has collided with the left boundary of the terrain
        this.position.x = this.terrain.leftBound + this.collider.radius;
        this.velocity.x *= -this.bounciness;
      }
    }
    
  
    ball_to_center(){
      this.position.set(createVector(0, 0))
      this.velocity.mult(0)
    }
   
    setSpeed(speed) {
      this.velocity.set(speed, 0);
    }

    getImpactAngle(collider) {
      let distX = this.position.x - collider.position.x;
      let distY = this.position.y - collider.position.y;
      let angle = atan2(distY, distX);
      return angle;
    }
  
    setVelocityFromAngle(angle, speed) {
      this.velocity.x = cos(angle) * speed;
      this.velocity.y = sin(angle) * speed;
    }

  }
  