class ParticleEmitter {
    constructor(rate, burstCount = 1, numBursts = 1, infinite = true) {
      this.rate = rate; // Number of particles emitted per second
      this.burstCount = burstCount; // Number of particles emitted in one burst
      this.infinite = infinite; // Whether the emitter is infinite or finite
      this.emitting = false; // Flag to indicate if the emitter is currently emitting
      this.lastEmitTime = 0; // Time of the last emission (used for burst delay)
      this.burstsRemaining = numBursts; // Number of bursts remaining for finite emitters
    }
  
    // Start emitting particles
    start() {
      this.emitting = true;
      this.lastEmitTime = millis();
    }
  
    // Stop emitting particles
    stop() {
      this.emitting = false;
    }

    //play burst instantially
    playBurst() {
        if (this.emitting && (this.infinite || this.burstsRemaining > 0)) {
          for (let i = 0; i < this.burstCount; i++) {
            this.emitParticle();
          }
    
          if (!this.infinite) {
            this.burstsRemaining--;
    
            if (this.burstsRemaining <= 0) {
              this.stop();
            }
          }
        }
      }
  
    // Update the emitter to emit particles based on the rate and burst settings
    update() {
      if (this.emitting) {
        const currentTime = millis();
        const elapsedTime = (currentTime - this.lastEmitTime) / 1000; // Convert to seconds
  
        if (this.infinite || this.burstsRemaining > 0) {
          // Check if it's time to emit particles based on the rate
          if (elapsedTime >= 1 / this.rate) {
            // Emit particles in a burst
            for (let i = 0; i < this.burstCount; i++) {
              this.emitParticle();
            }
  
            // Update the last emit time
            this.lastEmitTime = currentTime;
  
            // Decrease the bursts remaining for finite emitters
            if (!this.infinite) {
              this.burstsRemaining--;
  
              // Check if there are no bursts remaining, then stop emitting
              if (this.burstsRemaining <= 0) {
                this.stop();
              }
            }
          }
        } else {
          // If the emitter is finite and all bursts are emitted, stop emitting
          this.stop();
        }
      }
    }
  
    // Method to be overridden by the particle system to actually emit a particle
    emitParticle() {
      // This method will be implemented in the ParticleSystem class
    }
  }
  