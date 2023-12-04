

// Particle Types - RocketParticle (inherited from Particle)
class RocketParticle extends Particle {

    constructor(x, y){
        super(x, y, ROCKET_PARTICLE);
    }

    init(){
        super.init();
        this.scale = 1;

        //Collider is positioned at the top of the rocket
        const offset = p5.Vector.fromAngle(this.rotation).mult(20);
        this.particleCollider = new CircleCollider(this.position.copy().add(offset), this.radius);
    }

    update(){
        super.update();

        //Update the colllider position
        const offset = p5.Vector.fromAngle(this.rotation).mult(20);
        this.particleCollider.initCollider(this.position.copy().add(offset), this.radius);
    }

    show(){
        super.show();

        //DEBUG particleCollider position
        // push();
        // fill(0);
        // ellipse(this.particleCollider.position.x, this.particleCollider.position.y, this.particleCollider.radius * 2, this.particleCollider.radius * 2);
        // pop();

    }

}