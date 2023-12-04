

class RocketParticleSystem extends ParticleSystem{

    emitParticle() {
        const position = this.source.getRandomPosition();
        const velocity = this.source.getVelocity();
        let particle = particlePool.getParticle(RocketParticle);
        particle.setPosition(position);
        particle.useGravity(this.gravity);
        particle.velocity = velocity;
        particle.setScaleOverTime(1, 1);
        particle.rotationSpeed = 0;
        particle.rotation = this.source.velocityAngle;
        this.particles.push(particle);

        soundManager.playRocketIgnite();
      }


      //Specific update method for adding particle interaction with game objects functionality
      update(){
        super.update();
        if(!this.player) return;

        for (let i = this.particles.length - 1; i >= 0; i--) {
          let particle = this.particles[i];
          particle.update();
    
          if(this.player.playerName == 'player1'){
            const goalpostRight = this.player.ball.goalpost_right;
            if (goalpostRight.inside_collider.inCollision(particle.particleCollider)) {  //rocket fired in the right goalpost
              particle.killParticle();
            }

            const opponentPlayer = this.player.opponentPlayer;
            if (opponentPlayer.headCollider.inCollision(particle.particleCollider)) {  //rocket fired in the players head
              // console.log('head shot');
              opponentPlayer.drainEnergy(MAX_PLAYER_ENERGY * 0.2);                     //ROCKET HIT THE PLAYERS HEAD (-20% energy)
              particle.killParticle();
            }

            if (opponentPlayer.bodyCollider.inCollision(particle.particleCollider)) {  //rocket fired in the players body
              // console.log('body shot');
              opponentPlayer.drainEnergy(MAX_PLAYER_ENERGY * 0.1);                      //ROCKET HIT THE PLAYERS HEAD (-10% energy)
              particle.killParticle();
            }

          }
          else{
            const goalpostLeft = this.player.ball.goalpost_left;
            if (goalpostLeft.inside_collider.inCollision(particle.particleCollider)) {
              particle.killParticle();
            }

            const opponentPlayer = this.player.opponentPlayer;
            if (opponentPlayer.headCollider.inCollision(particle.particleCollider)) {  //rocket fired in the players head
              // console.log('head shot');
              opponentPlayer.drainEnergy(MAX_PLAYER_ENERGY * 0.2); 
              particle.killParticle();
            }

            if (opponentPlayer.bodyCollider.inCollision(particle.particleCollider)) {  //rocket fired in the players body
              // console.log('body shot');
              opponentPlayer.drainEnergy(MAX_PLAYER_ENERGY * 0.1); 
              particle.killParticle();
            }

          } 
          
        }


      }

}