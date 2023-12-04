class SoundManager {
    constructor() {
    //   this.jumpSound = loadSound('path/to/jump_sound.mp3');
      this.downfallSound = loadSound('soccer asseets/sounds/downfall.mp3');
      this.shootSound = loadSound('soccer asseets/sounds/ball_kick.mp3');
      this.ballTerrainImpactSound = loadSound('soccer asseets/sounds/ball_terrain_impact.mp3'); 
      this.rocketIgniteSound = loadSound('soccer asseets/sounds/rocket_ignite.mp3'); 
      this.rocketExplosionSound = loadSound('soccer asseets/sounds/rocket_explosion.mp3'); 
      this.collectSound1 = loadSound('soccer asseets/sounds/collect_sound1.mp3'); 
      this.collectSound2 = loadSound('soccer asseets/sounds/collect_sound2.mp3'); 
      this.playerHurtSound = loadSound('soccer asseets/sounds/player_hurt.mp3'); 
      this.iceBreakSound = loadSound('soccer asseets/sounds/ice_break.mp3'); 
      this.fanSound = loadSound('soccer asseets/sounds/fan.mp3'); 
      this.coinSound = loadSound('soccer asseets/sounds/coin.mp3'); 
      this.goalCheering = loadSound('soccer asseets/sounds/goal_cheering.mp3'); 
      this.menuSound = loadSound('soccer asseets/sounds/menu_sound.mp3'); 
      this.rainFallSound = loadSound('soccer asseets/sounds/rainfall.mp3'); 
      this.nightSound = loadSound('soccer asseets/sounds/night_sound.mp3'); 
      this.cityTerrainSound = loadSound('soccer asseets/sounds/city_terrain_sound.mp3'); 
      this.risingTerrainSound = loadSound('soccer asseets/sounds/earthquake.mp3'); 
      this.menuSound1 = loadSound('soccer asseets/sounds/menu_sound1.mp3'); 
      this.diamondSound = loadSound('soccer asseets/sounds/diamond.mp3'); 
      this.playerRisingSound = loadSound('soccer asseets/sounds/player_rising.mp3'); 
      this.publicCheeringSound = loadSound('soccer asseets/sounds/public_cheering.mp3'); 
      this.fireballSound = loadSound('soccer asseets/sounds/fireball.mp3'); 
      this.growSound = loadSound('soccer asseets/sounds/growSound.mp3'); 


      //LIST OF ALL SOUNDS TO BE LOADED
      this.sounds = [this.downfallSound, this.shootSound, this.ballTerrainImpactSound, this.rocketIgniteSound, this.rocketExplosionSound,
        this.collectSound1, this.collectSound2, this.playerHurtSound, this.iceBreakSound, this.fanSound, this.coinSound, this.goalCheering,
        this.menuSound, this.rainFallSound, this.nightSound, this.cityTerrainSound, this.risingTerrainSound, this.risingTerrainSound,
        this.menuSound1, this.diamondSound, this.playerRisingSound, this.publicCheeringSound, this.fireballSound, this.growSound
      ]

      //CURRENTLY PLAING SOUND
      this.currentlyPlayingBackgroundSound = null;

      this.backgroundSoundLevel = 1;
      this.effectsSoundLevel = 0.1;
    }

    setGlobalSoundLevel(level){
      this.backgroundSoundLevel = level;
      if(!this.currentlyPlayingBackgroundSound) return;

      this.currentlyPlayingBackgroundSound.setVolume(this.backgroundSoundLevel);
    }

    setEffectsSoundLevel(level){
      this.effectsSoundLevel = level;
    }


    //Asynchronous method that returns the state of loading assets in SoundManager
    isLoaded(){
      for(let sound of this.sounds)
        if(!sound.isLoaded()) return false;

      return true;
    }

    playMenuBackgorundSound(){

    }
  
    playJumpSound() {
    //   this.jumpSound.play();
    }
  
    playDownfallSound() {
      this.downfallSound.jump(0.61);
      this.downfallSound.rate(1);
      this.downfallSound.setVolume(this.effectsSoundLevel);
      this.downfallSound.play();
    }
  
    playShootSound() {
      this.shootSound.play();
      this.shootSound.setVolume(this.effectsSoundLevel);
    }

    playBallTerrainImpactSound() {
      this.ballTerrainImpactSound.play();
      this.ballTerrainImpactSound.setVolume(this.effectsSoundLevel);
    }

    playBallPlayerHeadImpactSound() {
      this.ballTerrainImpactSound.play();
      this.ballTerrainImpactSound.setVolume(this.effectsSoundLevel);
    }

    playRocketIgnite(){
      this.rocketIgniteSound.play();
      this.rocketIgniteSound.setVolume(this.effectsSoundLevel);
    }

    playRocketExplosion(){
      this.rocketExplosionSound.play();
      this.rocketExplosionSound.setVolume(this.effectsSoundLevel);
    }

    playCollectSound1(){
      this.collectSound1.play();
      this.collectSound1.setVolume(this.effectsSoundLevel);
    }

    playCollectSound2(){
      this.collectSound2.play();
      this.collectSound2.setVolume(this.effectsSoundLevel);
    }

    playPlayerHurt(){
      this.playerHurtSound.play();
      this.playerHurtSound.setVolume(this.effectsSoundLevel);
    }

    playIceBreak(){
      this.iceBreakSound.play();
      this.iceBreakSound.setVolume(this.effectsSoundLevel);
    }

    playFanSound() {
      this.fanSound.play();
      this.fanSound.setVolume(this.effectsSoundLevel);
    }

    stopFanSound() {
      this.fanSound.stop();
    }

    playCoinSound() {
      this.coinSound.play();
      this.coinSound.setVolume(this.effectsSoundLevel);
    }

    playGoalCheering() {
      this.goalCheering.play();
      this.goalCheering.setVolume(this.effectsSoundLevel);
    }

    playRisingTerrainSound(){
      this.risingTerrainSound.setVolume(this.effectsSoundLevel);
      this.risingTerrainSound.play();
    }

    stopRisingTerrainSound(){
      this.risingTerrainSound.stop();
    }
    
    playDiamondSound(){
      this.diamondSound.setVolume(this.effectsSoundLevel);
      this.diamondSound.play();
    }

    stopDiamondSound(){
      this.diamondSound.stop();
    }


    playPlayerRisingSound(){
      this.playerRisingSound.setVolume(this.effectsSoundLevel);
      this.playerRisingSound.play();
    }

    playPublicCheering(){
      this.publicCheeringSound.setVolume(this.effectsSoundLevel);
      this.publicCheeringSound.play();
    }
    stopPublicCheering(){
      this.publicCheeringSound.stop();
    }

    playFireballSound(){
      this.fireballSound.setVolume(this.effectsSoundLevel);
      this.fireballSound.play();
    }
    stopFireballSound(){
      this.fireballSound.stop();
    }

    
    playGrowSound(){
      this.growSound.setVolume(this.effectsSoundLevel);
      this.growSound.play();
    }

    
    





    //GLOBAL BACKGROUND SOUNDS
    playMenuSound(){
      if(this.currentlyPlayingBackgroundSound == this.menuSound) return;    //This menus sound is alrdy playing

      //Turn off background music
      if(this.currentlyPlayingBackgroundSound) this.currentlyPlayingBackgroundSound.stop();

      //Play new background music
      this.currentlyPlayingBackgroundSound = this.menuSound;
      this.currentlyPlayingBackgroundSound.setVolume(this.backgroundSoundLevel);
      this.currentlyPlayingBackgroundSound.loop();
      
    }

    playMenu1Sound(){
      if(this.currentlyPlayingBackgroundSound == this.menuSound1) return;    //This menus sound is alrdy playing

      //Turn off background music
      if(this.currentlyPlayingBackgroundSound) this.currentlyPlayingBackgroundSound.stop();

      //Play new background music
      this.currentlyPlayingBackgroundSound = this.menuSound1;
      this.currentlyPlayingBackgroundSound.setVolume(this.backgroundSoundLevel);
      this.currentlyPlayingBackgroundSound.loop();
    }


    playRainFallSound(){
      //If there were background sounds playing
      if(this.currentlyPlayingBackgroundSound) this.currentlyPlayingBackgroundSound.stop();

      this.rainFallSound.setVolume(this.backgroundSoundLevel);
      this.rainFallSound.loop();
      this.currentlyPlayingBackgroundSound = this.rainFallSound;
    }

    stopRainFallSound(){
      this.rainFallSound.stop();
      this.currentlyPlayingBackgroundSound = null;
    }

    playNightSound(){
      //If there were background sounds playing
      if(this.currentlyPlayingBackgroundSound) this.currentlyPlayingBackgroundSound.stop();

      this.nightSound.setVolume(this.backgroundSoundLevel);
      this.nightSound.loop();
      this.currentlyPlayingBackgroundSound = this.nightSound;
    }

    stopNightSound(){
      this.nightSound.stop();
      this.currentlyPlayingBackgroundSound = null;
    }

    playCitySound(){
      //If there were background sounds playing
      if(this.currentlyPlayingBackgroundSound) this.currentlyPlayingBackgroundSound.stop();
      
      this.cityTerrainSound.setVolume(this.backgroundSoundLevel);
      this.cityTerrainSound.loop();
      this.currentlyPlayingBackgroundSound = this.cityTerrainSound;
    }

    stopCitySound(){
      this.cityTerrainSound.stop();
      this.currentlyPlayingBackgroundSound = null;
    }


    pausePlayingCurrentBackgroundSound(){
      if(this.currentlyPlayingBackgroundSound) 
        this.currentlyPlayingBackgroundSound.pause();
    }

    continuePlayingCurrentBackgroundSound(){
      if(this.currentlyPlayingBackgroundSound)
        this.currentlyPlayingBackgroundSound.play();
    }
  
  }