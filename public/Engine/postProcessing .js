class PostProcessing {
    constructor() {
        this.defultFade = 13;
        this.fade = this.defultFade;
    }

    show() {
        layer_manager.addAsset(200, {    //debug colliders
            "draw": () => {
            push()

            noStroke()
            fill(0, this.fade);
            rect(-width, -height, 2*width, 2*height)

            pop()
            }
        })
    }

    setFade(fade){
        this.fade = fade;
    }

    resetFade(){
        this.fade = this.defultFade;
    }

  }
  