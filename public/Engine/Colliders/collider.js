class Collider {
    constructor(position, type, offset) {
      this.position = position;
      this.type = type;
      this.offset = offset
    }

    initCollider(position, type, offset){
      this.position = position;
      this.type = type;
      this.offset = offset
    }
  
    inCollision(other) {
      // This is just the base method and should be overridden by derived classes
      return false;
    }

    setPosition(pos){
      this.position.set(p5.Vector.add(pos, this.offset))
    }

}
  