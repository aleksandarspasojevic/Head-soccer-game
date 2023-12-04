class PreMatchScene extends Scene {
    constructor() {
      super("PreMatchScene");
      WIDTH = 1920;
      HEIGHT = 978;
  
      this.startButton = null;
      this.player1Data = null; 
      this.player2Data = null;
      this.player1 = null;
      this.player2 = null;

      this.selectableTerrainTypes = ["CENTER_TERRAIN", "RAIN_TERRAIN", "DARK_TERRAIN"];
      this.selectTerrainIndex = 0;


      //Particle Systems

      this.particleSystemManager = new ParticleSystemManager();
      particlePool = new ParticlePool();    

      const rectangularSource = new RectangularSource(-180, 30, 100, 200);
      rectangularSource.setRandomizeVelocityDirection(true);
      rectangularSource.setAngleInterval(-PI/2 - PI/3, -PI/2+PI/3);

      rectangularSource.setMagnitudeInterval(0.1, 1.5)
      const particleSystem = new GlowParticleSystem(rectangularSource, 10, 3, 1, true);
      particleSystem.disableGravity();
      particleSystem.start();
      particleSystem.playBurst();
      this.particleSystemManager.addParticleSystem(particleSystem);

      const rectangularSource1 = new RectangularSource(180, 30, 100, 200);
      rectangularSource1.setRandomizeVelocityDirection(true);
      rectangularSource1.setAngleInterval(-PI/2 - PI/3, -PI/2+PI/3);

      rectangularSource1.setMagnitudeInterval(0.1, 1.5)
      const particleSystem1 = new GlowParticleSystem(rectangularSource1, 10, 3, 1, true);
      particleSystem1.disableGravity();
      particleSystem1.start();
      particleSystem1.playBurst();
      this.particleSystemManager.addParticleSystem(particleSystem1);


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
      // player: this.selectedPlayer,
      // which: this.requestedPlayer

      // console.log(params);

      switch (params.which) {           //Got selected player from the PlayerSelectionScene
        case 'player1':
          this.player1Data = params.player;

          this.player1 = createPlayer(this.player1Data.avatar, 'player1', null, null, null);
          this.player1.itemCollection = null;        //Do not allow automatic creation of itemCollection
          this.player1.pos.sub(0, 60); 
          this.player1.setScale(1.8);
          break;
        
        case 'player2':
          this.player2Data = params.player;

          this.player2 = createPlayer(this.player2Data.avatar, 'player2', null, null, null);
          this.player2.itemCollection = null;
          this.player2.pos.sub(0, 60); 
          this.player2.setScale(1.8);
          break;
      
        default:
          break;
      }

    }
  
    onEnter() {
      // Set up anything specific to the MenuScene when it becomes active
      const canvas = createCanvas(WIDTH/2, HEIGHT/2);
      canvas.id('myCanvas');
      imageMode(CENTER);

      
      layer_manager = new LayerManager();
      this.initUI();

      soundManager.playMenu1Sound();
    }
  
    
  
    onExit() {
      // Clean up anything specific to the MenuScene when it becomes inactive
      this.startButton.remove();
      this.backButton.remove();
      this.addPlayer1Button.remove();
      this.addPlayer2Button.remove();
      this.leftTerrainButton.remove();
      this.rightTerrainButton.remove();
      
    }


    initUI(){
      //GET the canvas context for adding UI elements with Canvas as parent
      let canvasContainer = select('.canvas-container'); // Get the canvas-container by its ID

      
      // Create the player selection button
      this.startButton = createButton('START');
      this.startButton.class('btn btn-danger');
      this.startButton.parent(canvasContainer);
      this.startButton.position(width / 2 - 40, height / 2 - 25);
      this.startButton.attribute('disabled', true); // Disables the button

      this.startButton.mousePressed(()=>{

        (async () => {
          const selectedTerrainName = this.selectableTerrainTypes[this.selectTerrainIndex];

          const params = {
            player1Data: this.player1Data,
            player2Data: this.player2Data,
            selectedTerrainName: selectedTerrainName
          }

          await sceneManager.showScene("GameScene1", params);

        })();


        // LOAD IMMEDIATELY WIN SCENE
        // (async () => {
        //   const params = {
        //     player1Score: 10,
        //     player2Score: 11,
        //     player1Data: this.player1Data,
        //     player2Data: this.player2Data
        //   }
          
        //   await sceneManager.showScene("MatchEndScene", params);
  
        // })();

        

      }); 
      
      

      // Create the player selection button
      this.backButton = this.createButton("Back", createVector(10, 10),
        ()=>{
          (async () => {
            await sceneManager.showScene("MainMenuScene");
          })();
      });


      // Create the player selection button
      this.addPlayer1Button = createButton('Choose player');
      this.addPlayer1Button.class('btn btn-success');
      this.addPlayer1Button.parent(canvasContainer);
      this.addPlayer1Button.position(width / 2 - 240, height / 2 - 200);
      this.addPlayer1Button.mousePressed(()=>{
        (async () => {
          
          (async () => {
            //Requesting player selection for left player
            const params = {
              player: "player1",
              opponentPlayerData: this.player2Data
            }

            await sceneManager.showScene("PlayerSelectionScene", params);
          })();

        })();
      }); 


    

      // Create the player selection button
      this.addPlayer2Button = createButton('Choose player');
      this.addPlayer2Button.class('btn btn-success');
      this.addPlayer2Button.parent(canvasContainer);
      this.addPlayer2Button.position(width / 2 + 110, height / 2 - 200);
      this.addPlayer2Button.mousePressed(()=>{
        (async () => {
          
          (async () => {
            //Requesting player selection for left player
            const params = {
              player: "player2",
              opponentPlayerData: this.player1Data
            }

            await sceneManager.showScene("PlayerSelectionScene", params);
          })();

        })();
      }); 



      // Create the player selection button
      this.leftTerrainButton = this.createLeftArrowButton(createVector(width / 2 - 490, height / 2),
        ()=>{
          this.selectTerrainIndex = this.selectTerrainIndex-1;
          if(this.selectTerrainIndex < 0) this.selectTerrainIndex += this.selectableTerrainTypes.length;
          this.selectTerrainIndex = this.selectTerrainIndex % this.selectableTerrainTypes.length;
      });

      // Create the player selection button
      this.rightTerrainButton = this.createRightArrowButton(createVector(width / 2 + 430, height / 2),
        ()=>{
          this.selectTerrainIndex = (this.selectTerrainIndex+1) % this.selectableTerrainTypes.length;
      });

    }


  
    update() {
      // Update logic for the MenuScene
      this.player1?.updateAnimations();
      this.player2?.updateAnimations();

      //both players should be selected
      if(this.player1 && this.player2){
        this.startButton.class('btn btn-success'); 
        this.startButton.removeAttribute('disabled'); 
      }

      this.particleSystemManager.update();
    }
  
    display() {
      // Draw the MenuScene elements
      this.player1?.show();
      this.player2?.show();

      layer_manager.addAsset(-1, {
        'img' : this.getTerrainImage(),
        'img_pos': createVector(0, 0),
        'scale' : 0.5
      }).addAsset(0, {
        'img' : PODIUM_IMG,
        'img_pos': createVector(-250 + 150/2, 100+20),
        'scale' : 0.32
      }).addAsset(0, {
        'img' : PODIUM_IMG,
        'img_pos': createVector(250 - 150/2, 100+20),
        'scale' : 0.32  
      }).addAsset(-1, {   
        "draw": () => {
            push();

            //Player1 field
            fill(250, 250, 230, 100);
            noStroke();
            rect(-245, -120, 140, 230, 10); 
            // ellipse(-250 + 150/2, 100 + 55, 150, 60 );
            

            //Player2 field
            fill(250, 250, 230, 100);
            noStroke();
            rect(245 - 140, -120, 140, 230, 10); 
            fill(151, 153, 139);

            fill(255);
            textSize(15);
            textAlign(CENTER);
            text(this.player1Data?.name, -245 + 140/2, -100)
            text(this.player2Data?.name, 245 - 140/2, -100)

            pop(); 
            }
        });


      this.particleSystemManager.show();
      layer_manager.displayLayers();
    }

  
    getTerrainImage(){
      let img = TERRAIN_IMG;
      switch (this.selectableTerrainTypes[this.selectTerrainIndex]) {
        case "CENTER_TERRAIN":
          img = TERRAIN_IMG;
        break;

        case "RAIN_TERRAIN":
          img = RAIN_TERRAIN_IMG;
        break;

        case "DARK_TERRAIN":
          img = NIGHT_TERRAIN_IMG;
        break;

        default:
        break;
      }

      return img;
    }


  }