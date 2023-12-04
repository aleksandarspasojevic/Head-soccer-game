

class AboutScene extends Scene {
    constructor() {
      super("AboutScene");
      WIDTH = 1920;
      HEIGHT = 978;
  
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
            rect(-250, -200, 500, 400, 20); 
            fill(0);

            textSize(16);
            textAlign(CENTER);
            text("Soccer 2.5D multiplayer video game v0.2", 0, -HEIGHT*0.18);
            text("Undergraduate Thesis", 0, -HEIGHT*0.16);
            text("School of Electrical Engineering, University of Belgrade", 0, -HEIGHT*0.14);
            text("Description: Soccer multiplayer video game is a 2.5D video game", 0, -HEIGHT*0.06);
            text("that merges soccer with a distinct and entertaining visual style.", 0, -HEIGHT*0.04);
            text("The game's primary objective is for players to score goals by", 0, -HEIGHT*0.02);
            text("using characters with exaggerated heads. It offers a variety", 0, HEIGHT*0.00);
            text("of game modes, power-ups, and the ability to customize characters,", 0, HEIGHT*0.02);
            text("making it a multifaceted and engaging gaming experience.", 0, HEIGHT*0.04);

            text("created by:", 120, 130);
            text("Aleksandar Spasojević", 120, 150);

            text("mentored by:", -150, 130);
            text("Igor Tartalja", -150, 150);
            

            pop(); 
            }
        });
  
      this.layer_manager.displayLayers();

    }
  }