class ParticleSource {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.minMagnitude = 6;
    this.maxMagnitude = 9;
    this.minAngle = -PI / 2 - PI/9;
    this.maxAngle = -PI / 2 + PI/9;
    this.minScale = 0.5;
    this.maxScale = 1;
    this.randomizeVelocityDirection = true;
    this.randomizeVelocityMagnitude = true;
    this.velocityAngle = 0;
    this.velocityMagnitude = 6;
  }

  setVeloctyAngle(angle){
    this.velocityAngle = angle;
  }

  setVeloctyMagnitude(mag){
    this.velocityMagnitude = mag;
  }

  setRandomizeVelocityDirection(state = true){
    this.randomizeVelocityDirection = state;
  }

  setRandomizeVelocityMagnitude(state = true){
    this.randomizeVelocityMagnitude = state;
  }

  setMagnitudeInterval(minMagnitude, maxMagnitude) {
    this.minMagnitude = minMagnitude;
    this.maxMagnitude = maxMagnitude;
  }

  setAngleInterval(minAngle, maxAngle) {
    this.minAngle = minAngle;
    this.maxAngle = maxAngle;
  }

  setScaleInterval(minScale, maxScale) {
    this.minScale = minScale;
    this.maxScale = maxScale;
  }

  getVelocity() {
    let angle = this.velocityAngle;
    if(this.randomizeVelocityDirection)
      angle = random(this.minAngle, this.maxAngle);

    let magnitude = this.velocityMagnitude;
    if(this.randomizeVelocityMagnitude)
      magnitude = random(this.minMagnitude, this.maxMagnitude);
    
    return p5.Vector.fromAngle(angle).mult(magnitude);
  }

  getRandomInitialScale() {
    return random(this.minScale, this.maxScale);
  }

  getRandomImage() {
    // Replace 'path/to/your/image.png' with the path to your particle image
    return ICE_CUBE_SEGMENT1;
  }
}
