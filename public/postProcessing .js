class PostProcessing {
    constructor() {
      
    }
  
    show() {
        layer_manager.addAsset(10, {    //debug colliders
            "draw": () => {
            push()

            noStroke()
            fill(0, 15)
            rect(-width, -height, 2*width, 2*height)

            pop()
            }
        })
  
    }
  }
  