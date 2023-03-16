class Terrain {
    constructor(image) {
      this.image = image;
      this.leftBound = -image.width/4 *.8;
      this.rightBound = image.width/4 * .8;
      this.topBound = -image.height/4;
      this.bottomBound = image.height/4 * .65;


      this.flashlight = {
        pos: createVector(0, 0), 
        rot: 0,
        scale: 0.5
      }

      //ANIMATION keyframes
      this.flashlight_animator = new Animator(this.flashlight);

      this.flashlight_animator.addKeyFrame('flashlight', {
        time: 100,
        scale: 0.1
      })
      .addKeyFrame('flashlight', {
        time: 200,
        scale: 0.5
      })
      .addKeyFrame('flashlight', {
        time: 300,
        scale: 0.1
      })

      this.flashlight_animator.play('flashlight')
      setInterval(()=>{
        this.flashlight.pos.set(createVector(random(-250, 250), random(0, 80)))
        this.flashlight_animator.play('flashlight')
      }, 500)

    }
  
    show() {
      
      layer_manager.addAsset(-1, {
        'img' : this.image,
        'img_pos': createVector(0, 0),
        'scale' : 0.5
      }).addAsset(0, {    //debug borders
        "draw": () => {
          // push()
          // fill(0)
          // stroke(0, 255, 0)
          // noFill()
          // rect(this.leftBound, this.topBound, this.rightBound - this.leftBound, this.bottomBound - this.topBound)
          // pop()
        }
      }).addAsset(0, {    //twinkling effect from the public
        "draw": () => {
          noStroke()
          
          for(let i = 50; i > 5; i-=12){
            fill(255, 255, 255, map(i, 50, 0, 10, 200))
            ellipse(0,0, i, i)
          }
        },
        'scale' : this.flashlight.scale,
        'pos': this.flashlight.pos
      })


      this.flashlight_animator.update()
    }

    
    getNormal(position) {
      // Find the closest point on the terrain to the given position
      let closestX = constrain(position.x, this.leftBound, this.rightBound);
      let closestY = constrain(position.y, this.topBound, this.bottomBound);
  
      // Calculate the normal vector at the closest point
      let normalX = -1 * (this.image.get(floor(closestX + this.image.width/4), floor(closestY + this.image.height/4)) & 0xff) / 255;
      let normalY = -1 * (this.image.get(floor(closestX + this.image.width/4), floor(closestY + this.image.height/4)) & 0xff) / 255;
  
      // Normalize the normal vector and return it
      let normal = createVector(normalX, normalY);
      normal.normalize();
      return normal;
    }

  }
  