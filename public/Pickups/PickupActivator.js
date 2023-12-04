
class PickupActivator {
    constructor(terrain) {
      this.terrain = terrain;
      this.energyPickupTypes = [Coin, Diamond];   // Add more energy pickup-up types here
      this.powerupTypes = [FreezePowerup, RocketPowerup, BigPlayerPowerup, FanPowerup]; // Add more power-up types here
      this.pickups = [];
      this.activePowerup = null;           // Only one powerup could be active at a time

      this.minPowerupSpawnInterval = 5000; // Minimum time (in milliseconds) between powerup spawns
      this.maxPowerupSpawnInterval = 10000; // Maximum time (in milliseconds) between powerup spawns
      // this.minPowerupSpawnInterval = 1; // Minimum time (in milliseconds) between powerup spawns
      // this.maxPowerupSpawnInterval = 2; // Maximum time (in milliseconds) between powerup spawns
      this.nextPowerupSpawnTime = millis() + random(this.minPowerupSpawnInterval, this.maxPowerupSpawnInterval);

      this.minEnergyPickupSpawnInterval = 10000; // Minimum time (in milliseconds) between energy pickup spawns
      this.maxEnergyPickupSpawnInterval = 20000; // Maximum time (in milliseconds) between energy pickup spawns
      this.nextEnergyPickupSpawnTime = millis() + random(this.minEnergyPickupSpawnInterval, this.maxEnergyPickupSpawnInterval);
      
      this.maxActivePickups = 2;
      
      this.particleSystemManager = new ParticleSystemManager();

      this.freeSpawnPoints = [
        createVector(-120, terrain.bottomBound - random(60, 140)),
        createVector(-70, terrain.bottomBound - random(60, 140)),
        createVector(0, terrain.bottomBound - random(60, 140)),
        createVector(70, terrain.bottomBound - random(60, 140)),
        createVector(120, terrain.bottomBound - random(60, 140)),
      ];
    }
  
    update() {
      // Check if it's time to spawn a new power-up
      if (millis() >= this.nextPowerupSpawnTime) {
        if(this.pickups.length < this.maxActivePickups){
          this.spawnRandomPowerup();
        }
        this.nextPowerupSpawnTime = millis() + random(this.minPowerupSpawnInterval, this.maxPowerupSpawnInterval);
      }

      // Check if it's time to spawn a new energy pickup
      if (millis() >= this.nextEnergyPickupSpawnTime) {
        if(this.pickups.length < this.maxActivePickups){
          this.spawnRandomEnergyPickup();
        }
        this.nextEnergyPickupSpawnTime = millis() + random(this.minEnergyPickupSpawnInterval, this.maxEnergyPickupSpawnInterval);
      }
  
      // Update existing power-ups
      for (let i = this.pickups.length - 1; i >= 0; i--) {
        const pickup = this.pickups[i];
        pickup.update();
  
        // If a power-up has expired, remove it from the list
        if (!pickup.active) {
          this.pickups.splice(i, 1);
        }
      }

      //Update activated power-up
      this.activePowerup?.effectUpdate();
      this.particleSystemManager.update();
    }

    show(){
        for (let i = this.pickups.length - 1; i >= 0; i--) {
            const pickup = this.pickups[i];
            pickup.show();
        }

        this.activePowerup?.effectShow(); 
        this.particleSystemManager.show();
    }


    // getRandomPowerupSpawnPoint(){
    //   return random([
    //     createVector(-120, terrain.bottomBound - random(60, 140)),
    //     createVector(-70, terrain.bottomBound - random(60, 140)),
    //     createVector(-0, terrain.bottomBound - random(60, 140)),
    //     createVector(70, terrain.bottomBound - random(60, 140)),
    //     createVector(120, terrain.bottomBound - random(60, 140)),
    //   ]);
    // }


    getRandomPowerupSpawnPoint() {
      if (this.freeSpawnPoints.length === 0) {
        return null; // No free spawn points available
      }
      const randomIndex = floor(random(this.freeSpawnPoints.length));
      return this.freeSpawnPoints.splice(randomIndex, 1)[0];
    }


    getRandomEnergyPickupSpawnPoint(){
      return random([
        createVector(-120, terrain.bottomBound - 20),
        createVector(-70, terrain.bottomBound - 20),
        createVector(-0, terrain.bottomBound - 20),
        createVector(70, terrain.bottomBound - 20),
        createVector(120, terrain.bottomBound - 20),
      ]);
    }

  
    collect(player, pickup) {
        pickup.onCollect(player);

        //Clear pickup from the pickups list
        const index = this.pickups.indexOf(pickup);

        if (index !== -1) {
          this.pickups.splice(index, 1);
        }

        this.freeSpawnPoints.push(pickup.pos.copy());


        //CENTRALIZED CONTROL OF PICKUP SOUNDS

        if(pickup instanceof RocketPowerup) soundManager.playCollectSound1();
        if(pickup instanceof Coin) soundManager.playCoinSound();
        if(pickup instanceof Diamond) soundManager.playDiamondSound();
        else soundManager.playCollectSound1();
        

    }

    spawnRandomPowerup() {
      if (this.powerupTypes.length === 0) return;
  
      const spawnPoint = this.getRandomPowerupSpawnPoint();
      if(!spawnPoint) return;

      const randomPowerupType = random(this.powerupTypes);

      let powerup;
      switch (randomPowerupType) {
          case FreezePowerup:
              powerup = new FreezePowerup(ICE_CUBE, spawnPoint);
              break;
          case RocketPowerup:
              powerup = new RocketPowerup(ROCKET_IMG, spawnPoint);
              break;
          case BigPlayerPowerup:
              powerup = new BigPlayerPowerup(GROW_SERUM, spawnPoint);
              break;
          case FanPowerup:
              powerup = new FanPowerup(FAN_IMG, spawnPoint);
              break;
          default:
              break;
      }

      this.pickups.push(powerup);
    }


    spawnRandomEnergyPickup() {
      if (this.energyPickupTypes.length === 0) return;
  
      const spawnPoint = this.getRandomEnergyPickupSpawnPoint();
      const randomPickupType = random(this.energyPickupTypes);

      let energyPickup;
      switch (randomPickupType) {
          case Coin:
              energyPickup = new Coin(COIN_IMG, spawnPoint);
              break;
          case Diamond:
              energyPickup = new Diamond(DIAMOND_IMG, spawnPoint);
              break;
          default:
              break;
      }

      this.pickups.push(energyPickup);
    }

    playEffect(powerup){
      this.activePowerup = powerup;
    }

    endEffect(){
      this.activePowerup = null;
    }

    hasActivePowerupEffect(){
      return this.activePowerup != null;
    }

  }
  