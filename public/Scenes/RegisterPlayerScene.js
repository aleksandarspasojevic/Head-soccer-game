

class RegisterPlayerScene extends Scene {
    constructor() {
      super("RegisterPlayerScene");
      WIDTH = 1920;
      HEIGHT = 978;
  
      layer_manager = new LayerManager();

      this.requestedPlayer = 'player1';     //By default requested player is left player
      this.selectedPlayer = null;
    }
  
    async preloadPromise() {
      // Load assets specific to the MenuScene
      // For example, you can use p5.js's loadSound, loadImage, etc.
      return new Promise((resolve) => {
        // For simplicity, we just use a setTimeout here to simulate async loading
        setTimeout(() => resolve(), 0);
      });
    }

    initScene(params){
      this.requestedPlayer = params.which;
    }
  
    onEnter() {
      // Set up anything specific to the MenuScene when it becomes active
      const canvas = createCanvas(WIDTH/2, HEIGHT/2);
      canvas.id('myCanvas');
      imageMode(CENTER);
  
      //Player types
      this.selectablePlayerTypes = ["FAST_PLAYER", "JUMPY_PLAYER", "STRONG_PLAYER", "ENDURANT_PLAYER"];
      this.selectPlayerIndex = 0;

      
      let canvasContainer = select('.canvas-container'); // Get the canvas-container by its ID
      
      this.backButton = this.createButton("Back", createVector(WIDTH/4 - 200, HEIGHT*0.4),
        ()=>{
          (async () => {
            await sceneManager.showScene("PlayerSelectionScene");
          })();
      });


      this.registerButton = createButton('Register');
      this.registerButton.class('btn btn-danger');
      this.registerButton.parent(canvasContainer);
      this.registerButton.position(WIDTH/4 + 120, HEIGHT*0.4);
      this.registerButton.mousePressed(()=>{
        (async () => {
          //Register protocol
          let playerName = this.input.value()

          //Pull the playersData from localStorage
          playersData = retrieveData('players_data');

          //Check if there exists player with the same name
          if(this.playerExists(playersData, playerName)){
            //Show conflict modal
            playerNameConflictModal.showModal();
            return;
          }
          
          //Append the record with new player
          this.selectedPlayer = {
            avatar: this.selectablePlayerTypes[this.selectPlayerIndex],
            name: playerName,
            matchesWon: 0,
            matchesDrawn: 0,
            matchesLost: 0,
            goalDifference: 0,
            goalsScored: 0,
          }
          playersData.push(this.selectedPlayer);

          //Save players data to localStorage
          saveData('players_data', playersData);


          const params = {
            player: this.selectedPlayer,
            which: this.requestedPlayer
          }

          await sceneManager.showScene("PreMatchScene", params);
        })();
      }); 

      this.leftPlayerButton = this.createLeftArrowButton(createVector(width / 2 - 280, height / 2),
        ()=>{
          this.selectPlayerIndex = max(this.selectPlayerIndex-1, 0);
      });

      // Create the player selection button
      this.rightPlayerButton = this.createRightArrowButton(createVector(width / 2 + 180, height / 2),
        ()=>{
          this.selectPlayerIndex = min(this.selectPlayerIndex+1, this.selectablePlayerTypes.length-1);
      });


      this.inputGroup = createDiv('');
      this.inputGroup.parent(canvasContainer);
      this.inputGroup.class('input-group');
      this.inputGroup.style('width', '300px');
      this.inputGroup.style('position', 'absolute');
      this.inputGroup.style('top', '100px');
      this.inputGroup.style('left', '320px');
      

      let inputSpan = createSpan('Insert player name');
      inputSpan.class('input-group-text');

      this.input = createInput('');
      this.input.attribute('aria-label', 'First name'); 
      this.input.class('form-control');

      inputSpan.parent(this.inputGroup);
      this.input.parent(this.inputGroup);
      
      //CREATE PLAYERS

      this.fastPlayer = createPlayer('FAST_PLAYER', 'player1'); 
      this.fastPlayer.pos.set(0, -20);
      this.fastPlayer.setScale(1.8);
      this.fastPlayer.itemCollection = null;

      this.jumpyPlayer = createPlayer('JUMPY_PLAYER', 'player1'); 
      this.jumpyPlayer.pos.set(0, -20);
      this.jumpyPlayer.setScale(1.8);
      this.jumpyPlayer.itemCollection = null;

      this.strongPlayer = createPlayer('STRONG_PLAYER', 'player1'); 
      this.strongPlayer.pos.set(0, -20);
      this.strongPlayer.setScale(1.8);
      this.strongPlayer.itemCollection = null;

      this.endurantPlayer = createPlayer('ENDURANT_PLAYER', 'player1'); 
      this.endurantPlayer.pos.set(0, -20);
      this.endurantPlayer.setScale(1.8);
      this.endurantPlayer.itemCollection = null;
  
    }
  
    
  
    onExit() {
      // Clean up anything specific to the MenuScene when it becomes inactive
      this.inputGroup.remove();
      this.backButton.remove();
      this.registerButton.remove();
      this.leftPlayerButton.remove();
      this.rightPlayerButton.remove();
    }
  
    update() {
      // Update logic for the MenuScene
      let player = this.getSelectedPlayer();
      player.updateAnimations();

      let inputValue = this.input.value();

      //Can not register with empty name
      if(inputValue.length == 0){
        this.registerButton.attribute('disabled', true); // Disables the button
        this.registerButton.class('btn btn-danger');
      }
      else{
        this.registerButton.removeAttribute('disabled'); 
        this.registerButton.class('btn btn-success');
      }

    }
  
    display() {
      let player = this.getSelectedPlayer();
      player.show();

      layer_manager.addAsset(-1, {
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

            fill(100, 100, 100, 150);
            noStroke(); 
            rect(-100, 60, 200, 110, 20); 

            fill(255);
            textSize(13);
            textAlign(LEFT);
            text("Speed", -95, 80);
            text("Jump", -95, 80 + 25);
            text("Endurance", -95, 80 + 50);
            text("Strength", -95, 80 + 75);

            push();
            stroke(255, 255, 255, 100);
            strokeWeight(8);
            line(-20, 75, -20 + 100, 75);

            line(-20, 75 + 25, -20 + 100, 75 + 25);

            line(-20, 75 + 50, -20 + 100, 75 + 50);

            line(-20,  75 + 75, -20 + 100, 75 + 75);

            stroke(255, 255, 255, 180);
            let speed_bar_value = map(player.PLAYER_SPEED, 0, MAX_PLAYER_SPEED, 0, 100);
            let jump_strength_bar_value = map(player.defaultJumpStrength, 0, MAX_PLAYER_JUMP_STRENGTH, 0, 100);
            let energy_repair_rate_bar_value = map(player.energyRepairRate, 0, MAX_PLAYER_REPAIR_RATE, 0, 100);
            let max_shoot_intensity_bar_value = map(player.PLAYER_SHOOT_INTENSITY, 0, MAX_PLAYER_SHOOT_INTENSITY, 0, 100);
            

            //FILL values 
            line(-20, 75, -20 + speed_bar_value, 75);
            line(-20, 75 + 25, -20 + jump_strength_bar_value, 75 + 25);
            line(-20, 75 + 50, -20 + energy_repair_rate_bar_value, 75 + 50);
            line(-20,  75 + 75, -20 + max_shoot_intensity_bar_value, 75 + 75);

            pop();

            fill(0);
            textSize(16);
            textAlign(CENTER);
            text("Register player", 0, -HEIGHT*0.18);
            

            pop(); 
            }
        });
  
      layer_manager.displayLayers();

    }


    getSelectedPlayer(){
      let player = this.fastPlayer;
      switch (this.selectablePlayerTypes[this.selectPlayerIndex]) {
        case "FAST_PLAYER":
          player = this.fastPlayer;
        break;

        case "JUMPY_PLAYER":
          player = this.jumpyPlayer;
        break;

        case "ENDURANT_PLAYER":
          player = this.endurantPlayer;
        break;
        
        case "STRONG_PLAYER":
          player = this.strongPlayer;
        break;

        default:
        break;
      }

      return player;
    }


    playerExists(playersData, playerName) {
        for (let i = 0; i < playersData.length; i++) {
            if (playersData[i].name === playerName) 
                return true; // Player with the given name exists
            
        }
        return false; // Player with the given name does not exist
    }


  }