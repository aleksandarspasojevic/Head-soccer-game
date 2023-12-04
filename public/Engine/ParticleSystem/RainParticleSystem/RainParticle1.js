




// Particle Types - RainParticle (inherited from Particle)
class RainParticle1 extends Particle {

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
        
        for(let i = 30 * this.scale; i > 1; i-=4){
            fill(200, 200, 255, map(i, 15, 1, 10, 150) * this.transparency/100);
            ellipse(0, 0, i, i);
        }

        pop();
      }

}