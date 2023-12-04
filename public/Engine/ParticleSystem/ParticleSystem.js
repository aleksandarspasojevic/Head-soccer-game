// ParticleSystem class
class ParticleSystem extends ParticleEmitter {
  constructor(particleSource, rate, burstCount, numBursts, infinite) {
    super(rate, burstCount, numBursts, infinite);
    this.source = particleSource;
    this.particles = [];
    this.bounceLineY = null;
    this.interactionCollider = null;
    this.bounciness = 0.8;
    this.gravity = 0.3;
    this.collisionDetectionEnabled = false;
    this.player = null;
    this.destroyParticleCallback = null;
  }

  emitParticle() {
    const position = this.source.getRandomPosition();
    const velocity = this.source.getVelocity();
    const scale = this.source.getRandomInitialScale();
    const img = this.source.getRandomImage();
    let particle = particlePool.getParticle(IceParticle);
    particle.setPosition(position);
    particle.useGravity(this.gravity);
    particle.velocity = velocity;
    particle.scale = scale;
    particle.setScaleOverTime(particle.scale / 3, random(0.2, 0.3), random(0.7, 0.9) * particle.lifespan);
    particle.setTransparencyOverTime(particle.transparency / 2, 0.4, random(0.7, 0.9) * particle.lifespan);
    this.particles.push(particle);
  }

  update() {
    super.update();

    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      particle.update();

      // Check for collision with the bounce line if collision detection is enabled
      if ( this.collisionDetectionEnabled && this.interactionCollider.inCollision(particle.particleCollider)) {
          particle.position.y = this.bounceLineY - particle.radius;
          particle.velocity.y *= -this.bounciness;
          particle.velocity.x *= this.bounciness;
          particle.rotationSpeed *= this.bounciness;
      }


      if (particle.isDead()) {
        this.particleDestroyed(particle.position);
        this.particles.splice(i, 1);
        particle.recycle(); // Recycle the particle back to the pool
      }
    }
  }

  show() {
    layer_manager.addAsset(100, {
      "draw": () => {
        for (let particle of this.particles) {
          particle.show();
        }
      }
    }).addAsset(100, {    //debug interract colliders
      "draw": () => {
        // push()
        // stroke(0, 255, 0)
        // noFill()
        // rectMode(CENTER);
        // rect(this.interactionCollider.position.x, this.interactionCollider.position.y, this.interactionCollider.width, this.interactionCollider.height)
        // pop()
      }
    });
  }

  //If source is no longer emitting and there are no particles left, we assume that particle system is not alive
  isFinished() {
    return this.emitting == false && this.particles.length == 0;
  }

  enableCollisionDetection(bounceLineY, bounciness = 0.8) {
    this.bounceLineY = bounceLineY;
    let colliderHeight = 100;
    this.interactionCollider = new RectCollider(createVector(0, this.bounceLineY + colliderHeight/2), WIDTH/2, colliderHeight);
    this.bounciness = bounciness;
    this.collisionDetectionEnabled = true;
  }

  disableCollisionDetection() {
    this.collisionDetectionEnabled = false;
  }

  useGravity(gravity = 0.3){
    this.gravity = gravity;
  }

  disableGravity(){
    this.gravity = 0;
  }
  
  setPlayer(player){              //Particle System can have player reference for getting all scene interactable objects 
    this.player = player;
  }


  setDestroyParticleCallback(callbackFun){
    this.destroyParticleCallback = callbackFun;
  }

  particleDestroyed(position){
    if(this.destroyParticleCallback) this.destroyParticleCallback(position);
  }

}