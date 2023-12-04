

class LoadScene extends Scene {
    constructor() {
      super("LoadScene");
      WIDTH = 1920;
      HEIGHT = 978;
  
      this.layer_manager = new LayerManager();

      //Important - sound manager loads audio
      soundManager = new SoundManager();

      this.scene_switched = false;
    }
  
    async preloadPromise() {
      // Load assets specific to the MenuScene
      // For example, you can use p5.js's loadSound, loadImage, etc.
      return new Promise((resolve) => {
        // For simplicity, we just use a setTimeout here to simulate async loading
        setTimeout(() => resolve(), 0);
      });
    }
  
    onEnter() {
      // Set up anything specific to the MenuScene when it becomes active
      const canvas = createCanvas(WIDTH/2, HEIGHT/2);
      canvas.id('myCanvas');
      imageMode(CENTER);
    }
  
    
  
    onExit() {
      // Clean up anything specific to the MenuScene when it becomes inactive
    }
  
    update() {
      // Update logic for the MenuScene
      
      if(soundManager.isLoaded() && !this.scene_switched){
        this.scene_switched = true;
        setTimeout(() => {
          (async () => {
            await sceneManager.showScene("MainMenuScene");
          })();

        }, 500);
        
      }

    }
  
    display() {
      this.layer_manager.addAsset(-1, {
        'img' : NIGHT_TERRAIN_IMG,
        'img_pos': createVector(0, 0),
        'scale' : 0.5
      }).addAsset(0, {   
        "draw": () => {
            push();

            fill(255);
            textFont(goal_font);
            textAlign(CENTER, CENTER);
            textSize(48);
            text("Loading... ", 0, HEIGHT*0.03);
            

            pop(); 
            }
        });
  
      this.layer_manager.displayLayers();

    }
  }