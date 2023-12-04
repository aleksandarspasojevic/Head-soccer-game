

class Pickup {
    constructor(name, x, y, size, img) {
      this.pos = createVector(x, y);
      this.rot = 0;
      this.size = size;
      this.img = img;
      this.active = true;
      this.name = name;
      this.player = null;
      this.pickupCollider = new CircleCollider(this.pos.copy(), 10, createVector(0, 0));       //default pickup collider
    }
  
    show() {
      
    }
  
    update() {
      // Define general behavior for all power-ups
    }
  
    // Method callled on pickup collect event
    onCollect(player){
        this.player = player;
    }
  
    deactivate() {
      // Deactivate the power-up when it has been used or expired.
      this.active = false;
    }
  }