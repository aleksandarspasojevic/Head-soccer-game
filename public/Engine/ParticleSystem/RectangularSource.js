

class RectangularSource extends ParticleSource {
    constructor(x, y, width, height) {
      super(x, y);
      this.width = width;
      this.height = height;

      this.pos;
    }

    setDynamicSourcePosition(pos){
      this.pos = pos;
    }

  
    getRandomPosition() {
      if(this.pos){     //dynamic poistion source
        return createVector(
          this.pos.x + random(-this.width / 2, this.width / 2),
          this.pos.y + random(-this.height / 2, this.height / 2)
        );
      }else{
        return createVector(
          this.position.x + random(-this.width / 2, this.width / 2),
          this.position.y + random(-this.height / 2, this.height / 2)
        );
      }
      
    }
  }