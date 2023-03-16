class KeyFrame {
    constructor(time, position, rotation, scale) {
      this.time = time;
      this.position = position.copy();
      this.rotation = rotation;
      this.scale = scale;
    }
  }