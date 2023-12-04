

class ParticleSystemManager {
    constructor() {
      this.particleSystems = [];
    }
  
    addParticleSystem(particleSystem) {
      this.particleSystems.push(particleSystem);
    }
  
    update() {
      for (let i = this.particleSystems.length - 1; i >= 0; i--) {
        const particleSystem = this.particleSystems[i];
        particleSystem.update();
        if (particleSystem.isFinished()) {
          this.particleSystems.splice(i, 1);
        }
      }
    }
  
    show() {
      for (let particleSystem of this.particleSystems) {
        particleSystem.show();
      }
    }
  
    spawnParticleSystem(x, y) {
      const particleSource = new ParticleSource(x, y);
      const particleSystem = new ParticleSystem(particleSource);
      this.addParticleSystem(particleSystem);
    }
  }
  