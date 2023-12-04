

// Particle Types - GlowParticle (inherited from Particle)
class GlowParticle extends Particle {

    constructor(x, y){
        super(x, y);
    }

    //Add particle configurations
    init(){
        super.init();
        this.lifespan = 20;
        this.useGravity(0);
    }

    show() {
        push();
        translate(this.position.x, this.position.y);
        noStroke();

        
        for(let i = 40 * this.scale; i > 1; i-=4){
            fill(255, 255, 200, map(i, 20, 1, 10, 150) * this.transparency/100);
            ellipse(0, 0, i, i);
        }

        pop();
      }

}