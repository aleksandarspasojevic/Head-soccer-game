



class MatchEndScene extends Scene {
    constructor() {
      super("MatchEndScene");
      WIDTH = 1920;
      HEIGHT = 978;
  
      this.startButton = null;
      this.player1Score = null;
      this.player2Score = null;
      this.player1Data = null;
      this.player2Data = null;

      this.player1 = null;
      this.player2 = null;

      this.winnerPlayerData = null; 
      this.looserPlayerData = null; 

      layer_manager = new LayerManager();
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
  
      let canvasContainer = select('.canvas-container'); // Get the canvas-container by its ID

      this.mainMenuButton = createButton('Main menu');
      this.mainMenuButton.class('btn btn-secondary');
      this.mainMenuButton.parent(canvasContainer);
      this.mainMenuButton.position(WIDTH/4 - 55, HEIGHT*0.05);
      this.mainMenuButton.mousePressed(()=>{
        (async () => {
          await sceneManager.showScene("MainMenuScene");
        })();
      }); 



      this.replayButton = createButton('Replay');
      this.replayButton.class('btn btn-warning');
      this.replayButton.parent(canvasContainer);
      this.replayButton.position(WIDTH/4 - 35, HEIGHT*0.42);
      this.replayButton.mousePressed(()=>{
        (async () => {
          const params = {
            player1Data: this.player1Data,
            player2Data: this.player2Data,
          }

          await sceneManager.showScene("GameScene1", params);
        })();
      }); 


      //Update the database for winning and loosing players
      //PLAYER attributes
      // avatar: 
      // name: 
      // matchesWon: 
      // matchesDrawn: 
      // matchesLost: 
      // goalDifference: 
      // goalsScored: 

      //Pull the playersData from localStorage
      let playersData = retrieveData('players_data');
      
      //Iterate through dataset and get references to winnerPlayer and looserPlayer data
      for(let playerData of playersData){
        if(playerData.name == this.winnerPlayerData.name) this.winnerPlayerData = playerData;
        if(playerData.name == this.looserPlayerData.name) this.looserPlayerData = playerData;
      }


      if(this.player1Score == this.player2Score){   //Match result is DRAW
        this.winnerPlayerData.matchesDrawn += 1;

        this.looserPlayerData.matchesDrawn += 1;

        soundManager.playMenu1Sound();
      }else{
        this.winnerPlayerData.matchesWon += 1;
        this.winnerPlayerData.goalDifference += Math.abs(this.player1Score - this.player2Score); 

        this.looserPlayerData.matchesLost += 1;
        this.looserPlayerData.goalDifference -= Math.abs(this.player1Score - this.player2Score); 

        soundManager.playGoalCheering();
        soundManager.playPublicCheering();
        soundManager.playCitySound();
      }

      this.winnerPlayerData.goalsScored += max(this.player1Score, this.player2Score);
      this.looserPlayerData.goalsScored += min(this.player2Score, this.player2Score);
      

      //Save players data to localStorage
      saveData('players_data', playersData);


      playersData = retrieveData('players_data');
      for(let playerData of playersData){
        console.log(playerData)
      }

    }
  

    initScene(params){
        this.particleSystemManager = new ParticleSystemManager();
        this.player1Score = params.player1Score;
        this.player2Score = params.player2Score;
        this.player1Data = params.player1Data;
        this.player2Data = params.player2Data;


        this.player1 = createPlayer(this.player1Data.avatar, 'player1', null, null, null);
        this.player1.itemCollection = null;        //Do not allow automatic creation of itemCollection

        this.player2 = createPlayer(this.player2Data.avatar, 'player2', null, null, null);
        this.player2.itemCollection = null;        //Do not allow automatic creation of itemCollection

        if(this.player1Score > this.player2Score){
          //WINNER player
          this.player1.pos.sub(-60, 100 - 40); 
          this.addPlayerWinAnimation(this.player1);


          //LOSER PLAYER
          this.player2.pos.sub(100, 30 - 40); 
          this.addPlayerLooseAnimation(this.player2);
        }else if(this.player1Score < this.player2Score){
          //LOSER player
          this.player1.pos.sub(-100, 30 - 40); 
          this.addPlayerLooseAnimation(this.player1);

          //WINNER player
          this.player2.pos.sub(0, 100 - 40); 
          this.addPlayerWinAnimation(this.player2); 
        }else{
          this.player1.setScale(2.6);
          this.player1.pos.sub(0, 100 - 60); 

          this.player2.setScale(2.6);
          this.player2.pos.sub(0, 100 - 60); 
        }

        this.winnerPlayer = null;
        this.looserPlayer = null;
        if(this.player1Score > this.player2Score){
          this.winnerPlayer = this.player1;
          this.looserPlayer = this.player2;
          this.winnerPlayerData = this.player1Data;
          this.looserPlayerData = this.player2Data;
        }
        else if(this.player2Score > this.player1Score){
          this.looserPlayer = this.player1;
          this.winnerPlayer = this.player2;
          this.winnerPlayerData = this.player2Data;
          this.looserPlayerData = this.player1Data;
        }else{
          this.winnerPlayerData = this.player1Data;  //Just get playerData references
          this.looserPlayerData = this.player2Data;
        }

        //PARTICLE systems
        if(this.winnerPlayer){
          const rectangularSource = new RectangularSource(this.winnerPlayer.pos.x, this.winnerPlayer.pos.y, HEIGHT*0.4, WIDTH*0.2);
          rectangularSource.setRandomizeVelocityDirection(true);
          rectangularSource.setAngleInterval(0, 2*PI);

          rectangularSource.setMagnitudeInterval(5, 10)
          const particleSystem = new GlowParticleSystem(rectangularSource, 5, 15, 1, true);
          particleSystem.disableGravity();
          particleSystem.start();
          particleSystem.playBurst();

          this.particleSystemManager.addParticleSystem(particleSystem);
        }
        
        if(this.looserPlayer){
          const rectangularSource = new RectangularSource(this.looserPlayer.pos.x, this.looserPlayer.pos.y, 50, 50);
          rectangularSource.setDynamicSourcePosition(this.looserPlayer.pos);
          rectangularSource.setRandomizeVelocityDirection(true);
          
          if(this.winnerPlayer.playerName == 'player1') rectangularSource.setAngleInterval(PI + PI/6, PI/2 + PI/6);
          else  rectangularSource.setAngleInterval(-PI/6, PI/2 - PI/6);

          rectangularSource.setMagnitudeInterval(1, 10)
          const particleSystem = new RainParticleSystem(rectangularSource, 10, 3, 1, true);
          particleSystem.start();
          particleSystem.playBurst();

          this.particleSystemManager.addParticleSystem(particleSystem);
        
        }
        

    }
  
    onExit() {
      // Clean up anything specific to the MenuScene when it becomes inactive
      this.mainMenuButton.remove();
      this.replayButton.remove();
      this.particleSystemManager = null;

      soundManager.stopCitySound();
      soundManager.stopPublicCheering();
    }
  
    update() {
      // Update logic for the MenuScene
      this.player1?.updateAnimations();
      this.player2?.updateAnimations();
      this.particleSystemManager?.update();
    }
  
    display() {

      this.player1?.show();
      this.player2?.show();

      layer_manager.addAsset(-1, {
        'img' : NIGHT_TERRAIN_IMG,
        'img_pos': createVector(0, 0),
        'scale' : 0.5
      }).addAsset(1, {   
        "draw": () => {
          push();

          textSize(48);
          fill(247, 178, 17);
          textAlign(CENTER);
          textFont(goal_font)

          text(this.player1Score + "", -200, -80);
          text(this.player2Score + "", 200, -80);

          if(this.player1Score > this.player2Score){
            text("WIN", -200, -150);
            text("LOSE", 200, -150);
          }else if(this.player1Score < this.player2Score){
            text("LOSE", -200, -150);
            text("WIN", 200, -150);
          }else{
            text("DRAW", 0, -50);
          }
          

          pop(); 
          }
      })
  
      this.particleSystemManager?.show();
      layer_manager.displayLayers();
    }


    addPlayerWinAnimation(player){
      player.setScale(4);
      player.player_animator = new Animator(player.head);
      const playerYposition = player.pos.y;
      player.player_animator.addKeyFrame('downlook', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1,
        callbackFunction: (timePassed)=>{
          //PROGRESS value goes from 0 to 1 
          const progress = timePassed / 600;     //Animation progress between 2 keyFrames

          player.pos.y = map(progress, 0, 1, playerYposition, playerYposition-50);
        }
      }).addKeyFrame('downlook', {
        time: 600,
        position: createVector(0, 0),
        rotation: player.playerName=='player1'? 0.3 : -0.3,
        scale: 1.05,
        callbackFunction: (timePassed)=>{
          //PROGRESS value goes from 0 to 1 
          const progress = timePassed / 200;     //Animation progress between 2 keyFrames

          player.pos.y = map(progress, 0, 1, playerYposition-50, playerYposition);
        }
      })
      .addKeyFrame('downlook', {
        time: 800,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      });

      player.foot_animator.addKeyFrame('shake', {
        time: 0,
        rotation: 0,
        scale: 1
      }).addKeyFrame('shake', {
        time: 150,
        position: createVector(0, 0),
        rotation: -0.3,
        scale: 1
      })
      .addKeyFrame('shake', {
        time: 180,
        rotation: -0.38,
        scale: 1
      })
      .addKeyFrame('shake', {
        time: 370,
        rotation: 0,
        scale: 1
      })
      
      player.player_animator.play('downlook', true, true);
      player.foot_animator.play('shake', true, true);
    }


    addPlayerLooseAnimation(player){
      player.setScale(1.8);

      player.player_animator = new Animator(player.head);


      player.foot_animator.addKeyFrame('shake', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      }).addKeyFrame('shake', {
        time: 100,
        position: createVector(0, 5),
        rotation: -0.02,
        scale: 1
      })
      .addKeyFrame('shake', {
        time: 180,
        position: createVector(0, 0),
        rotation: -0.05,
        scale: 1
      })
      
      
      player.foot_animator.play('shake', true, true);


      let playerXposition = player.pos.x;
      player.player_animator.addKeyFrame('move', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1,
        callbackFunction: (timePassed)=>{
          //PROGRESS value goes from 0 to 1 
          const progress = timePassed / 1500;     //Animation progress between 2 keyFrames

          // console.log(player.playerName);
          let direction = player.playerName=='player1' ? -1 : 1;
          player.pos.x = map(progress, 0, 1, playerXposition, playerXposition + 200*direction);
        }
      }).addKeyFrame('move', {
        time: 1500,
        position: createVector(0, 0),
        rotation: 0.3,
        scale: 1,
      })
      .addCallbackAtFinished(()=>{

        let playerXposition = player.pos.x;

        player.player_animator.addKeyFrame('uplook', {
          time: 0,
          position: createVector(0, 0),
          rotation: 0,
          scale: 1,
          callbackFunction: (timePassed)=>{
            //PROGRESS value goes from 0 to 1 
            const progress = timePassed / 400;     //Animation progress between 2 keyFrames

            player.pos.x = map(progress, 0, 1, playerXposition, playerXposition+10);
          }
        }).addKeyFrame('uplook', {
          time: 400,
          position: createVector(0, 0),
          rotation: player.playerName=='player1'? 0.4 : -0.4,
          scale: 0.95,
          callbackFunction: (timePassed)=>{
            //PROGRESS value goes from 0 to 1 
            const progress = timePassed / 400;     //Animation progress between 2 keyFrames

            player.pos.x = map(progress, 0, 1, playerXposition+10, playerXposition);
          }
        })
        .addKeyFrame('uplook', {
          time: 800,
          position: createVector(0, 0),
          rotation: 0,
          scale: 1
        });

        player.player_animator.play('uplook', true, true);


      })
        
        
      

      player.player_animator.play('move', true, false);

     
    }


  }