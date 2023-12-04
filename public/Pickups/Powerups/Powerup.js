
// Powerup inherits pickup behaviour with specific effect behaviour
class Powerup extends Pickup{     
    
  
    effect() {
      // Handle the effect of the power-up when a player collects it.
      const pickupActivator = this.player.pickupActivator;
      
      if(!pickupActivator.hasActivePowerupEffect()){       //if there is no any active powerup effect, play effect
        pickupActivator.playEffect(this);
        this.effectInit();                                  //Initialize effect
        return true;
      }

      return false;
    }

    onCollect(player){
      super.onCollect(player);

      this.player.itemCollection.collectItem(this);           //POWERUP goes to ItemCollector when its collected
    }

    //EFFECT INIT, UPDATE AND SHOW methods
    effectInit(){

    }

    effectUpdate(){

    }

    effectShow(){

    }
  
  }