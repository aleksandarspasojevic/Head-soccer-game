class Particle {
  constructor(x, y, img) {
    this.position = createVector(x, y);
    this.img = img; // Image for particle representation
    
    this.init();
  }

  init(){
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.lifespan = 150;
    this.aliveTime = 0;
    this.rotation = 0;
    this.rotationSpeed = random(-0.1, 0.1);
    this.radius = 5; // Size of the particle
    this.scale = 1;
    this.transparency = 85;

    this.startScale = 1; // Initial scale
    this.endScale = 1; // Final scale
    this.scaleBeginTime = 0; // Default to 0
    this.scaleEndTime = this.lifespan; // Default to the lifespan

    this.startTransparency = 100; // Initial transparency
    this.endTransparency = 100; // Final transparency
    this.transparencyBeginTime = 0; // Default to 0
    this.transparencyEndTime = this.lifespan; // Default to the lifespan

    this.particleCollider = new CircleCollider(this.position, this.radius);
    this.alive = true;
  }

  useGravity(gravityIntensity = 0.3){
    this.acceleration = createVector(0, gravityIntensity);
  }

  setScaleOverTime(startScale, endScale, scaleBeginTime = 0, scaleEndTime = this.lifespan) {
    this.startScale = startScale;
    this.endScale = endScale;
    this.scaleBeginTime = scaleBeginTime;
    this.scaleEndTime = scaleEndTime;
  }

  setTransparencyOverTime(startTransparency, endTransparency, transparencyBeginTime = 0, transparencyEndTime = this.lifespan) {
    this.startTransparency = startTransparency;
    this.endTransparency = endTransparency;
    this.transparencyBeginTime = transparencyBeginTime;
    this.transparencyEndTime = transparencyEndTime;
  }

  setPosition(pos){
    this.position.set(pos);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.rotation += this.rotationSpeed;
    this.aliveTime += 1;

    if (this.aliveTime >= this.scaleBeginTime && this.aliveTime <= this.scaleEndTime) {
      // Scale over time
      let scaleProgress = map(this.aliveTime, this.scaleBeginTime, this.scaleEndTime, 0, 1);
      this.scale = lerp(this.startScale, this.endScale, scaleProgress);
    }

    if (this.aliveTime >= this.transparencyBeginTime && this.aliveTime <= this.transparencyEndTime) {
      // Transparency over time
      let transparencyProgress = map(this.aliveTime, this.transparencyBeginTime, this.transparencyEndTime, 0, 1);
      this.transparency = lerp(this.startTransparency, this.endTransparency, transparencyProgress);
    }
  }

  show() {

    push()
    translate(this.position)
    rotate(this.rotation)
    tint(255, this.transparency*255/100);
    image(this.img, 0, 0, this.img.width * this.scale, this.img.height * this.scale);
    pop()
    
    // push();
    // translate(this.position.x, this.position.y);
    // rotate(this.rotation);
    // fill(255, 255, 255, this.transparency*255/100);
    // noStroke();
    // ellipse(0, 0, 20 * this.scale, 20 * this.scale)
    // pop();
  }

  killParticle(){
    this.alive = false;
  }

  isDead() {
    return this.aliveTime >= this.lifespan || !this.alive;
  }

  // Recycling the particle back to the pool
  recycle() {
    particlePool.recycleParticle(this);
  }

}
