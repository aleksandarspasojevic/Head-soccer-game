class CircleCollider extends Collider {
    constructor(pos, r, offset = createVector(0, 0)) {
      super(pos, "circle", offset);
      this.radius = r;
    }
  
    inCollision(other) {
      if (other instanceof CircleCollider) {
        // Check for intersection between two circles
        let dx = this.position.x - other.position.x;
        let dy = this.position.y - other.position.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        // console.log(distance, this.radius + other.radius)
        return distance < this.radius + other.radius;
      } else {
        // Collision detection between different collider types not implemented
        return false;
      }
    }
  }
  