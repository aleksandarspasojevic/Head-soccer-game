

// Particle Pool Class
class ParticlePool {
    constructor() {
      this.pool = {};
    }
  
    getParticle(particleTypeClass) {
      if (!this.pool[particleTypeClass.name] || this.pool[particleTypeClass.name].length === 0) {
        return new particleTypeClass();
      } else {
        let particle = this.pool[particleTypeClass.name].pop();
        particle.init();
        return particle;
      }
    }
  
    recycleParticle(particle) {
      const particleType = particle.constructor.name;
      if (!this.pool[particleType]) {
        this.pool[particleType] = [];
      }
      this.pool[particleType].push(particle);
    }
  }