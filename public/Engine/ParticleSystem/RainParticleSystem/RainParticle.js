




// Particle Types - RainParticle (inherited from Particle)
class RainParticle extends Particle {

    constructor(x, y){
        super(x, y);

        this.rainParticleLength = random(2, 10);
    }

    //Add particle configurations
    init(){
        super.init();
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        noStroke();

        strokeWeight(0.6);
        stroke(200, 200, 255, 255 * this.transparency/100);
        line(0, 0, 0, this.rainParticleLength);

        pop();
      }

}