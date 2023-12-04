class Modifier {
    constructor(duration) {
      this.duration = duration; // Duration of the modifier in milliseconds
      this.startTime = 0; // Timestamp when the modifier is applied
      this.active = false; // Flag to track if the modifier is active
      this.player = null;
    }
  
    applyModifier(player) {
      // Apply the visual and behavioral changes to the player when the modifier is applied
      this.active = true;
      this.startTime = millis();
      this.player = player;
    }
  
    removeModifier() {
      // Remove the visual and behavioral changes when the modifier expires or is removed
      this.active = false;
    }
  
    update() {
      // Update the state of the modifier (if needed) during the active duration
    }
  
    show() {
      // Draw any visual effects related to the modifier (if needed)
    }
  
    hasExpired() {
      // Check if the modifier has expired based on the current time and the duration
      return this.active && millis() >= this.startTime + this.duration;
    }
  }
  