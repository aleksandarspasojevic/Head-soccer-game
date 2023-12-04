

class EllipticalSource extends ParticleSource {
    constructor(x, y, radiusX, radiusY) {
      super(x, y);
      this.radiusX = radiusX;
      this.radiusY = radiusY;
    }
  
    getRandomPosition() {
      const angle = random(TWO_PI);
      const x = this.position.x + cos(angle) * this.radiusX;
      const y = this.position.y + sin(angle) * this.radiusY;
      return createVector(x, y);
    }
  }