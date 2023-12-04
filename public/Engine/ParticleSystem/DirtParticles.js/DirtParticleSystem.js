


class DirtParticleSystem extends ParticleSystem{

    emitParticle() {
        const position = this.source.getRandomPosition();
        const velocity = this.source.getVelocity();
        this.source.setScaleInterval(0.2, 0.5); 
        const scale = this.source.getRandomInitialScale();
        const DirtParticleTypes = [DirtParticle, DirtParticle1];
        let particle = particlePool.getParticle(random(DirtParticleTypes));
        particle.setPosition(position);
        particle.useGravity(this.gravity);
        particle.velocity = velocity;
        particle.scale = scale;
        particle.lifespan = random(20, 400);
        particle.setScaleOverTime(particle.scale / 3, random(0.2, 0.3), random(0.7, 0.9) * particle.lifespan);
        particle.setTransparencyOverTime(particle.transparency / 2, 0.4, random(0.7, 0.9) * particle.lifespan);
        this.particles.push(particle);
      }

}