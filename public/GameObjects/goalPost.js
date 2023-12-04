class GoalPost {
    constructor(x, y, size, imgs) {
      this.pos = createVector(x, y);
      this.size = size
      this.imgs = imgs;
      this.width = size * 1.5
      this.height = size * 5
      this.collider = new RectCollider(this.pos.copy().add(0, -85), this.width*2.9, this.height*0.15);
      this.inside_collider = new RectCollider(this.pos.copy(), this.width*0.9 , this.height);
      

      this.goalpost = {
        pos: this.pos.copy(), 
        rot: 0,
        scale: 1
      }

      //ANIMATION keyframes
      this.goalpost_animator = new Animator(this.goalpost);

      this.goalpost_animator.addKeyFrame('frame_shoot', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      }).addKeyFrame('frame_shoot', {
        time: 100,
        position: createVector(-2, 2),
        rotation: 0,
        scale: 0.98
      }).addKeyFrame('frame_shoot', {
        time: 200,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      })

    }
  
    show() {
      layer_manager.addAsset(1, {
        'img' : this.imgs[1],
        'img_pos': createVector(0, 0),
        'scale' : this.size/100 * this.goalpost.scale,
        'pos': this.goalpost.pos
      }).addAsset(10, {
        'img' : this.imgs[0],
        'img_pos': createVector(0, 0),
        'scale': this.size/100 * this.goalpost.scale,
        'pos': this.goalpost.pos
      }).addAsset(1, {
        "draw": () => {     //debug info 
          // push()
          // stroke(0, 255, 0)
          // noFill()
          // rectMode(CENTER);
          // rect(this.collider.position.x, this.collider.position.y, this.collider.width, this.collider.height)
          // rect(this.inside_collider.position.x, this.inside_collider.position.y, this.inside_collider.width, this.inside_collider.height)
          // pop()
        }
      })
    }
  
    update() {
      this.goalpost.pos.set(this.pos)
      this.goalpost_animator.update();
    }
  }
  