let TERRAIN_IMG, BALL_IMG, PLAYER1_HEAD_IMG, PLAYER1_FOOT_IMG,
GOALPOST_LEFT1_IMG, GOALPOST_LEFT2_IMG, GOALPOST_RIGHT1_IMG,
GOALPOST_RIGHT2_IMG, PLAYER2_HEAD_IMG, PLAYER2_FOOT_IMG,
PLAYER1_BODY_IMG, PLAYER2_BODY_IMG, SCORE_IMG;

let ball, goalpost_left, goalpost_right, terrain, score, trail_effect;
let player1, player2;
let layer_manager;
let ssd_font;
let post_processing;

let WIDTH, HEIGHT;    //canvas dimensions

PLAYER_SPEED = 4
PLAYER_SHOOT_INTENSITY = 10
GRAVITY = .5 

function preload() {
  // Load the images
  TERRAIN_IMG = loadImage('soccer asseets/playground.jpg');
  BALL_IMG = loadImage('soccer asseets/ball1.png');
  PLAYER1_HEAD_IMG = loadImage('soccer asseets/head1.png');
  PLAYER1_BODY_IMG = loadImage('soccer asseets/body1.png');
  PLAYER1_FOOT_IMG = loadImage('soccer asseets/foot1.png');
  PLAYER2_HEAD_IMG = loadImage('soccer asseets/head2.png');
  PLAYER2_BODY_IMG = loadImage('soccer asseets/body2.png');
  PLAYER2_FOOT_IMG = loadImage('soccer asseets/foot2.png');
  GOALPOST_LEFT1_IMG = loadImage('soccer asseets/goalpost_left1.png');
  GOALPOST_LEFT2_IMG = loadImage('soccer asseets/goalpost_left2.png');
  GOALPOST_RIGHT1_IMG = loadImage('soccer asseets/goalpost_right1.png');
  GOALPOST_RIGHT2_IMG = loadImage('soccer asseets/goalpost_right2.png');
  SCORE_IMG = loadImage('soccer asseets/score.png');
  ssd_font = loadFont('fonts/Digital-7.ttf');
  goal_font = loadFont('fonts/KGSummerSunshineBlackout.ttf');
}



function setup() {
  goalpost_left = new GoalPost(-360, 75, 33, [GOALPOST_LEFT1_IMG, GOALPOST_LEFT2_IMG]);
  goalpost_right = new GoalPost(360, 75, 33, [GOALPOST_RIGHT1_IMG, GOALPOST_RIGHT2_IMG]);
  terrain = new Terrain(TERRAIN_IMG);
  ball = new Ball(0, 0, 11, BALL_IMG, terrain, goalpost_left, goalpost_right);
  player1 = new Player(-180, 110, 25, {
    'head': {'img' : PLAYER1_HEAD_IMG, 'img_pos': createVector(0, -10)},
    'body': {'img' : PLAYER1_BODY_IMG, 'img_pos': createVector(-5, 15)},
    'foot': {'img' : PLAYER1_FOOT_IMG, 'img_pos': createVector(4, 26)}
  },
  terrain, ball, "player1");

  player2 = new Player(180, 110, 25, {
    'head': {'img' : PLAYER2_HEAD_IMG, 'img_pos': createVector(0, -10)},
    'body': {'img' : PLAYER2_BODY_IMG, 'img_pos': createVector(6, 11)},
    'foot': {'img' : PLAYER2_FOOT_IMG, 'img_pos': createVector(-4, 26)}
  },
  terrain, ball, "player2");
  score = new Score(SCORE_IMG)
  trail_effect = new TrailEffect(ball, 40, ball.size*2.5)
  post_processing = new PostProcessing()
 
  // Create a canvas that matches the size of the image
  WIDTH = TERRAIN_IMG.width;
  HEIGHT = TERRAIN_IMG.height;
  createCanvas(WIDTH/2, HEIGHT/2);
  imageMode(CENTER);

  layer_manager = new LayerManager();
  
}


function draw(){
  clear();
  translate(WIDTH/4, HEIGHT/4);
  
  //update funcions
  ball.update(terrain, player1, player2);
  player1.update(terrain, ball);
  player2.update(terrain, ball);
  goalpost_left.update();
  goalpost_right.update();
  trail_effect.update()
  score.update()

  //render functions
  terrain.show();
  goalpost_left.show();
  goalpost_right.show();
  player1.show();
  player2.show();
  ball.show();
  score.show();
  trail_effect.show()
  post_processing.show()
  
  layer_manager.displayLayers();
}


function keyPressed() {
  switch (keyCode) {
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
      player2.shootBall(); 
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
      player1.shootBall(); 
      player1.foot_animator.play('shoot'); 
      break; 
    default:   // no default action  

  }  

 }


function keyReleased() {
  player1.player_animator.stop()
  player2.player_animator.stop()
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    player2.setHorizontalAcceleration(0);
    player2.setSpeedX(0);
  } 

  if(keyCode === 'A'.charCodeAt(0) || keyCode === 'D'.charCodeAt(0)){
    player1.setHorizontalAcceleration(0);
    player1.setSpeedX(0);
  }
}


