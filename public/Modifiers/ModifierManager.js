

class ModifierManager {
    constructor(player) {
      this.activeModifier = null; // Reference to the currently active modifier
      this.player = player;
      this.particleSystemManager = new ParticleSystemManager();
    }
  
    applyModifier(modifier) {
      if (this.activeModifier) {
        // If there is already an active modifier, remove it before applying the new one
        // this.removeModifier();
        return false;
      }
      this.activeModifier = modifier;
      this.activeModifier.applyModifier(this.player, this);
      return true;
    }
  
    removeModifier() {
      if (this.activeModifier) {
        this.activeModifier.removeModifier();
        this.activeModifier = null;
      }
    }
  
    update() {
      if (this.activeModifier) {
        this.activeModifier.update();
        if (this.activeModifier.hasExpired()) {
          this.removeModifier();
        }
      }
      this.particleSystemManager.update();
    }
  
    show() {
      if (this.activeModifier) {
        this.activeModifier.show();
      }
      this.particleSystemManager.show();
    }
  }