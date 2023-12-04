

class ShowerRainParticleSystem extends ParticleSystem{

    emitParticle() {
        const position = this.source.getRandomPosition();
        const velocity = this.source.getVelocity();
        const RainParticleType = random([RainParticle, RainParticle1])
        let particle = particlePool.getParticle(RainParticleType);
        particle.setPosition(position);
        particle.useGravity(this.gravity);
        particle.velocity = velocity;
        particle.setScaleOverTime(0.3, 0.1);
        particle.rotationSpeed = 0;
        particle.rotation = this.source.velocityAngle;
        particle.lifespan = random(10, 60);
        this.particles.push(particle);
      }

}