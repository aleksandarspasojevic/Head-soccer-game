
class TrailEffect {
    constructor(object, trailLength, trailWidth) {
      this.object = object;
      this.trailLength = trailLength;
      this.trailWidth = trailWidth;
      this.trail = [];
    }
  
    update() {
      // add a new point to the object's trail
      this.trail.push(createVector(this.object.position.x, this.object.position.y));
  
      // remove the oldest point if the trail is too long
      if (this.trail.length > this.trailLength) {
        this.trail.splice(0, 1);
      }
    }
  
    show() {
        layer_manager.addAsset(0, {  
            "draw": () => {
                push()
                noStroke()
                // draw the object's trail as a series of circles
                for (let i = 0; i < this.trail.length; i++) {
                    let alpha = map(i, 0, this.trail.length, 0, 80);
                    fill(255, alpha);
                    ellipse(this.trail[i].x, this.trail[i].y,  map(i, 0, this.trail.length, 0, this.trailWidth) );
                }
                pop()
            }
        })
    }
}
  