





class FireBallModifier extends Modifier {
    constructor(duration) {
      super(duration); // Call the constructor of the parent class (Modifier)

      this.modifierManager = null;
    }
  
    
    applyModifier(player, modifierManager) {
      super.applyModifier(player); // Call the applyModifier method of the parent class (Modifier)
      this.modifierManager = modifierManager;
    
      //Apply changes to the player

      this.player.trail_effect.trailLength = 60;
      this.player.trail_effect.trailColor = color(200, 50, 50);   //Fire trail

    }
  
    removeModifier(player) {
      super.removeModifier(player); // Call the removeModifier method of the parent class (Modifier)
    
      //Revert changes on the player
      this.player.trail_effect.trailLength = 40;
      this.player.trail_effect.trailColor = color(255);

    }
  
    update() {
      super.update(); 
    }
  
    show() {
      super.show(); 
      layer_manager.addAsset(0, {    //debug colliders
        "draw": () => {
          push()
          noStroke();
          fill(255, 0, 0, 10)
          rectMode(CENTER);

          let size = 150;
          for(let i = size; i > 0; i-=12){
            fill(255, 0, 0, map(i, size, 0, 0, 50))
            ellipse(this.player.pos.x, this.player.pos.y, i, i)
          }

          pop()
        }
      })
    }
  }
  