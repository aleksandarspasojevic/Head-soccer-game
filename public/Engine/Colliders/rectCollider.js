class RectCollider extends Collider {
    constructor(pos, w, h, offset = createVector(0,0)) {
      super(pos, "rect", offset);
      this.width = w;
      this.height = h;
    }

    initCollider(pos, w, h, offset = createVector(0,0)){
      super.initCollider(pos, "rect", offset);
      this.width = w;
      this.height = h;
    }
 
    inCollision(other) {
      if (other instanceof RectCollider) {
        // Check for intersection between two rectangles
        const halfWidthSum = (this.width + other.width) / 2;
        const halfHeightSum = (this.height + other.height) / 2;
        const dx = Math.abs(this.position.x - other.position.x);
        const dy = Math.abs(this.position.y - other.position.y);
  
        return dx <= halfWidthSum && dy <= halfHeightSum;
      } else if (other instanceof CircleCollider) {
        // Check for intersection between a rectangle and a circle
        const closestX = Math.max(
          this.position.x - this.width / 2,
          Math.min(other.position.x, this.position.x + this.width / 2)
        );
        const closestY = Math.max(
          this.position.y - this.height / 2,
          Math.min(other.position.y, this.position.y + this.height / 2)
        );
        const distanceX = other.position.x - closestX;
        const distanceY = other.position.y - closestY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  
        return distance < other.radius;
      } else {
        // Collision detection between different collider types not implemented
        return false;
      }
    }
  }
  