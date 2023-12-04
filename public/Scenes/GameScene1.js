let TERRAIN_IMG, BALL_IMG, PLAYER1_HEAD_IMG, PLAYER1_FOOT_IMG,
GOALPOST_LEFT1_IMG, GOALPOST_LEFT2_IMG, GOALPOST_RIGHT1_IMG,
GOALPOST_RIGHT2_IMG, PLAYER2_HEAD_IMG, PLAYER2_FOOT_IMG,
PLAYER1_BODY_IMG, PLAYER2_BODY_IMG, SCORE_IMG, ICE_CUBE, ROCKET_IMG, ICE_CUBE_SEGMENT1,
ROCKET_PARTICLE, GROW_SERUM, FAN_IMG, WEAPON_IMG, COIN_IMG, DIAMOND_IMG, TERRAIN_CENTER_IMG,
DIRT_PARTICLE1, DIRT_PARTICLE2, NIGHT_TERRAIN_IMG, RAIN_TERRAIN_IMG, RAIN_PUDDLE_IMG,
THUNDER_CLOUD_IMG, TREE_IMG, PODIUM_IMG, PLAYER3_HEAD_IMG, PLAYER3_BODY_IMG, PLAYER3_FOOT_IMG,
PLAYER4_HEAD_IMG, PLAYER4_BODY_IMG, PLAYER4_FOOT_IMG, ROBOT_PART1, ROBOT_PART2, ROBOT_PART3;

let ball, goalpost_left, goalpost_right, terrain, score;
let player1, player2;
let layer_manager;
let post_processing;
let pickupActivator;

GRAVITY = .5 

let sceneManager
let particlePool;
// let paricleSystemManager;
let leftFan, rightFan;

class GameScene1 extends Scene {
  constructor() {
    super("GameScene1");

    this.selectedTerrainName = null;     //initialized in intiScene method
    this.player1Data = null;             //Left player data from database
    this.player2Data = null;             //Right player data from database
  }


  async preloadPromise() {
    const imagePromises = [
      new Promise((resolve) => {
        TERRAIN_IMG = loadImage('soccer asseets/cityTerrain.png', resolve);
      }),
      new Promise((resolve) => {
        BALL_IMG = loadImage('soccer asseets/ball1.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER1_HEAD_IMG = loadImage('soccer asseets/head1.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER1_BODY_IMG = loadImage('soccer asseets/body1.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER1_FOOT_IMG = loadImage('soccer asseets/foot1.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER2_HEAD_IMG = loadImage('soccer asseets/head2.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER2_BODY_IMG = loadImage('soccer asseets/body2.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER2_FOOT_IMG = loadImage('soccer asseets/foot2.png', resolve);
      }),
      new Promise((resolve) => {
        GOALPOST_LEFT1_IMG = loadImage('soccer asseets/goalpost_left1.png', resolve);
      }),
      new Promise((resolve) => {
        GOALPOST_LEFT2_IMG = loadImage('soccer asseets/goalpost_left2.png', resolve);
      }),
      new Promise((resolve) => {
        GOALPOST_RIGHT1_IMG = loadImage('soccer asseets/goalpost_right1.png', resolve);
      }),
      new Promise((resolve) => {
        GOALPOST_RIGHT2_IMG = loadImage('soccer asseets/goalpost_right2.png', resolve);
      }),
      new Promise((resolve) => {
        SCORE_IMG = loadImage('soccer asseets/score.png', resolve);
      }),
      new Promise((resolve) => {
        ICE_CUBE = loadImage('soccer asseets/iceCube.png', resolve);
      }),
      new Promise((resolve) => {
        ROCKET_IMG = loadImage('soccer asseets/rocket.png', resolve);
      }),
      new Promise((resolve) => {
        ICE_CUBE_SEGMENT1 = loadImage('soccer asseets/iceCubeSegment1.png', resolve);
      }),
      new Promise((resolve) => {
        ROCKET_PARTICLE = loadImage('soccer asseets/rocketParticle.png', resolve);
      }),
      new Promise((resolve) => {
        GROW_SERUM = loadImage('soccer asseets/growSerum.png', resolve);
      }),
      new Promise((resolve) => {
        FAN_IMG = loadImage('soccer asseets/fan.png', resolve);
      }),
      new Promise((resolve) => {
        WEAPON_IMG = loadImage('soccer asseets/weapon.png', resolve);
      }),
      new Promise((resolve) => {
        COIN_IMG = loadImage('soccer asseets/coin.png', resolve);
      }),
      new Promise((resolve) => {
        DIAMOND_IMG = loadImage('soccer asseets/diamond.png', resolve);
      }),
      new Promise((resolve) => {
        TERRAIN_CENTER_IMG = loadImage('soccer asseets/terrainCenter.png', resolve);
      }),
      new Promise((resolve) => {
        DIRT_PARTICLE1 = loadImage('soccer asseets/dirt.png', resolve);
      }),
      new Promise((resolve) => {
        DIRT_PARTICLE2 = loadImage('soccer asseets/dirt1.png', resolve);
      }),
      new Promise((resolve) => {
        RAIN_TERRAIN_IMG = loadImage('soccer asseets/rainTerrain.png', resolve);
      }),
      new Promise((resolve) => {
        RAIN_PUDDLE_IMG = loadImage('soccer asseets/rainPuddle.png', resolve);
      }),
      new Promise((resolve) => {
        THUNDER_CLOUD_IMG = loadImage('soccer asseets/thunderCloud.png', resolve);
      }),
      new Promise((resolve) => {
        NIGHT_TERRAIN_IMG = loadImage('soccer asseets/nightTerrain.png', resolve);
      }),
      new Promise((resolve) => {
        TREE_IMG = loadImage('soccer asseets/tree.png', resolve);
      }),
      new Promise((resolve) => {
        PODIUM_IMG = loadImage('soccer asseets/podium.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER3_BODY_IMG = loadImage('soccer asseets/body3.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER3_FOOT_IMG = loadImage('soccer asseets/foot3.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER3_HEAD_IMG = loadImage('soccer asseets/head3.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER4_BODY_IMG = loadImage('soccer asseets/body4.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER4_FOOT_IMG = loadImage('soccer asseets/foot4.png', resolve);
      }),
      new Promise((resolve) => {
        PLAYER4_HEAD_IMG = loadImage('soccer asseets/head4.png', resolve);
      }),
      new Promise((resolve) => {
        ROBOT_PART1 = loadImage('soccer asseets/robot_part1.png', resolve);
      }),
      new Promise((resolve) => {
        ROBOT_PART2 = loadImage('soccer asseets/robot_part2.png', resolve);
      }),
      new Promise((resolve) => {
        ROBOT_PART3 = loadImage('soccer asseets/robot_part3.png', resolve);
      }),
      
    ];
  
    
    // Wait for all image to resolve
    await Promise.all([...imagePromises]);
  
  }


  
  //Called before onEnter() method by the Scene passing the data to current scene
  initScene(params){
    // console.log(params);

    // player1Data: this.player1Data,
    // player2Data: this.player2Data,
    // selectedTerrainName: selectedTerrainName

    // console.log(this.selectedTerrainName);
    if(params.selectedTerrainName) 
      this.selectedTerrainName = params.selectedTerrainName;     //Get play scene selections from PreMatchScene
    this.player1Data = params.player1Data;
    this.player2Data = params.player2Data;

  }

  
  onEnter() {
    // Set up anything specific to the GameScene when it becomes active
    layer_manager = new LayerManager();
    particlePool = new ParticlePool();

    goalpost_left = new GoalPost(-360, 75, 33, [GOALPOST_LEFT1_IMG, GOALPOST_LEFT2_IMG]);
    goalpost_right = new GoalPost(360, 75, 33, [GOALPOST_RIGHT1_IMG, GOALPOST_RIGHT2_IMG]);


    //TERRAIN SELECTION
    // console.log(this.selectedTerrainName);
    switch(this.selectedTerrainName){
      case 'CENTER_TERRAIN':
        terrain = new CityTerrain(TERRAIN_IMG);

        soundManager.playCitySound();
      break;
      case 'RAIN_TERRAIN':
        terrain = new RainTerrain(RAIN_TERRAIN_IMG, RAIN_PUDDLE_IMG, THUNDER_CLOUD_IMG);

        soundManager.playRainFallSound();
      break;
      case 'DARK_TERRAIN':
        terrain = new NightTerrain(NIGHT_TERRAIN_IMG, TREE_IMG);

        soundManager.playNightSound();
      break;

      default:
      break;

    }

    
    ball = new Ball(0, 0, 11, BALL_IMG, terrain, goalpost_left, goalpost_right);
    pickupActivator = new PickupActivator(terrain);

    //Construct players based on selected type 
    player1 = createPlayer(this.player1Data.avatar, 'player1', terrain, ball, pickupActivator); 
    player2 = createPlayer(this.player2Data.avatar, 'player2', terrain, ball, pickupActivator);
    
    player1.setOpponentPlayer(player2);
    player2.setOpponentPlayer(player1);
    terrain.setPlayers(player1, player2);                //terrain affects both players including objects they reference
    score = new Score(SCORE_IMG, player1, player2, this.player1Data, this.player2Data);
    post_processing = new PostProcessing()
    
    
    // Create a canvas that matches the size of the image
    WIDTH = TERRAIN_IMG.width;
    HEIGHT = TERRAIN_IMG.height;
    const canvas = createCanvas(WIDTH/2, HEIGHT/2);
    canvas.id('myCanvas');
    imageMode(CENTER);

    leftFan = new Fan(createVector(-400, 80), ball, true);
    rightFan = new Fan(createVector(400, 80), ball, false);
    // paricleSystemManager = new ParticleSystemManager();
  }



  onExit() {
    // Clean up anything specific to the GameScene when it becomes inactive

    soundManager.stopRainFallSound();
    soundManager.stopNightSound();
    soundManager.stopCitySound();
  }

  update() {
    //update funcions
    ball.update(terrain, player1, player2);
    player1.update();
    player2.update();
    terrain.update();
    goalpost_left.update();
    goalpost_right.update();
    score.update();
    pickupActivator.update();
    leftFan.update();
    rightFan.update();
  }

  
  display() {
    //render functions
    terrain.show();
    goalpost_left.show();
    goalpost_right.show();
    player1.show();
    player2.show();
    ball.show();
    score.show();
    post_processing.show()
    pickupActivator.show()
    leftFan.show();
    rightFan.show();
    
    layer_manager.displayLayers();

    // // console.log("FRAME RATE" + frameRate())
    // const rectangularSource = new RectangularSource(0, 0, 50, 150);
    // const particleSystem = new AirParticleSystem(rectangularSource);
    // particleSystem.enableCollisionDetection(400, 0.5);


    // for(let i = 0; i < 1; i++)
    //   particleSystem.emitParticle();

    
    // paricleSystemManager.addParticleSystem(particleSystem);

    // paricleSystemManager.update();
    // paricleSystemManager.show();

    // console.log(frameRate())
  }


 
  keyPressed(event) {
    switch (event.keyCode) {
      case LEFT_ARROW:
        player2.setHorizontalAcceleration(-0.4);
        break;
      case RIGHT_ARROW:
        player2.setHorizontalAcceleration(0.4);
        break;
      case UP_ARROW: 
        player2.jump();
        break; 
      case ENTER: // 32 is the keyCode for the spacebar 
        player2.shootBall(0);                //0 shoot angle (ground shoot)
        player2.foot_animator.play('shoot'); 
        break; 
      case 'A'.charCodeAt(0):
        player1.setHorizontalAcceleration(-0.4);
        break;
      case 'D'.charCodeAt(0):
        player1.setHorizontalAcceleration(0.4);
        break;
      case 'W'.charCodeAt(0): 
        player1.jump();
        break; 
      case 32: // 32 is the keyCode for the spacebar 
        player1.shootBall(0); 
        player1.foot_animator.play('shoot'); 
        break; 
      case ESCAPE:
        pauseModal.showModal();
        break;
      default:   // no default action  
        if (event.keyCode >= 48 && event.keyCode <= 57) {   //digits 0 - 9 on left side of keyboard for left player
          // Convert the keyCode to the actual digit value
          const digit = event.keyCode - 48; 
          player1.itemCollection.selectItem(digit);
        }
        else if (event.keyCode >= 96 && event.keyCode <= 105) {  //digits 0 - 9 on right side of keyboard for right player
          // Convert the keyCode to the actual digit value
          const digit = event.keyCode - 96; 
          player2.itemCollection.selectItem(digit);
        }

        if (event.key === 'Shift') {
          if (event.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {    //Left shift key 
            player1.shootBall();
            player1.foot_animator.play('shoot');
          } else if (event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {   //Right shift key
            player2.shootBall();
            player2.foot_animator.play('shoot');
          }
        }

    }  

  }


  keyReleased(event) {
    player1.player_animator.stop()
    player2.player_animator.stop()
    if (event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW) {
      player2.setHorizontalAcceleration(0);
      player2.setSpeedX(0);
    } 

    if(event.keyCode === 'A'.charCodeAt(0) || event.keyCode === 'D'.charCodeAt(0)){
      player1.setHorizontalAcceleration(0);
      player1.setSpeedX(0);
    }
  }

};




//PLAYER CREATION
//player_types - FAST_PLAYER, JUMPY_PLAYER, ENDURANT_PLAYER, STRONG_PLAYER
//playerName - player1 or player2  -- defining just their position and heading on the terrain
function createPlayer(player_type, playerName, terrain, ball, pickupActivator){
  let player = null;

  let playerXposition = -180;
  if(playerName == 'player2') playerXposition = 180; 


  switch (player_type) {
    case "FAST_PLAYER":
      player = new FastPlayer(playerXposition, 110, terrain, ball, pickupActivator, playerName);
      if(playerName == 'player2') player.setInvert(true);

    break;

    case "JUMPY_PLAYER":
      player = new JumpyPlayer(playerXposition, 110, terrain, ball, pickupActivator, playerName);
      if(playerName == 'player1') player.setInvert(true);
    break;

    case "STRONG_PLAYER":
      player = new StrongPlayer(playerXposition, 110, terrain, ball, pickupActivator, playerName);
      if(playerName == 'player2') player.setInvert(true);
    break;

    case "ENDURANT_PLAYER":
      player = new EndurantPlayer(playerXposition, 110, terrain, ball, pickupActivator, playerName);
      if(playerName == 'player1') player.setInvert(true);
    break;

    default:
    break;
  }

  return player;
}