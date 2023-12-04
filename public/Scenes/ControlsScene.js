


class ControlsScene extends Scene {
    constructor() {
      super("ControlsScene");
      WIDTH = 1920;
      HEIGHT = 978;
  
      this.startButton = null;
      this.layer_manager = new LayerManager();
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
  
      // Create the player selection button
      this.backButton = this.createButton("Back", createVector(width / 2 - 45, height / 2 + 150),
        ()=>{
          (async () => {
            await sceneManager.showScene("MainMenuScene");
          })();
      });
  
    }
  
    
  
    onExit() {
      // Clean up anything specific to the MenuScene when it becomes inactive
      this.backButton.remove();
    }
  
    update() {
      // Update logic for the MenuScene
    }
  
    display() {
      this.layer_manager.addAsset(-1, {
        'img' : NIGHT_TERRAIN_IMG,
        'img_pos': createVector(0, 0),
        'scale' : 0.5
      }).addAsset(0, {   
        "draw": () => {
            push();

            // Draw the MenuScene elements
            fill(200, 200, 200, 200);
            noStroke(); 
            rect(-300, -200, 600, 400, 20); 

            //FILL content
            fill(0);
            textSize(16);
            textAlign(LEFT);

            //Left player controls
            text("Left player", -180, -150);
            text("Move controls: W, A, S, D", -280, -110);
            text("Air shoot: SHIFT", -280, -60);
            text("Ground shoot: SPACE", -280, -10);
            text("Powerup activation: 1-4", -280, 40);


            //Right player controls
            text("Right player", 100, -150);
            text("Move controls: ↑, ←, ↓, →", 70, -110);
            text("Air shoot: SHIFT", 70, -60);
            text("Ground shoot: ENTER", 70, -10);
            text("Powerup activation: 1-4", 70, 40);
            

            pop(); 
            }
        });
  
      this.layer_manager.displayLayers();

    }
  }