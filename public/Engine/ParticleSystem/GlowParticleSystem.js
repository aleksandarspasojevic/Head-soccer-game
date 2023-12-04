


class GlowParticleSystem extends ParticleSystem{

    emitParticle() {
        const position = this.source.getRandomPosition();
        const velocity = this.source.getVelocity();
        let particle = particlePool.getParticle(GlowParticle);
        particle.setPosition(position);
        particle.useGravity(this.gravity);
        particle.velocity = velocity;
        particle.setScaleOverTime(0.5, 0.1);
        particle.rotationSpeed = 0;
        particle.rotation = this.source.velocityAngle;
        this.particles.push(particle);
      }

}