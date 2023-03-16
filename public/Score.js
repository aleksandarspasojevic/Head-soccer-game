class Score {
    constructor(image) {
      this.image = image; // image reference for displaying score
      this.position = createVector(0, -200); // position of score image on screen
      this.player1Score = 0; // initial score for player 1
      this.player2Score = 0; // initial score for player 2
      this.goalScoredAnim = null
      this.time = 60   //default match time is 60s

      this.scored_goal_text = {
        pos: createVector(-750, 50), 
        rot: 0, 
        scale: 1
      }
      this.score_animator = new Animator(this.scored_goal_text);

      this.score_animator.addKeyFrame('goal_scored', {
        time: 0,
        position: createVector(100, 0),
        rotation: 0,
        scale: 0.6
      }).addKeyFrame('goal_scored', {
        time: 500,
        position: createVector(700, 0),
        rotation: 0,
        scale: 1.2
      }).addKeyFrame('goal_scored', {
        time: 1300,
        position: createVector(900, 0),
        rotation: 0,
        scale: 1.2
      }).addKeyFrame('goal_scored', {
        time: 1800,
        position: createVector(1600, 0),
        rotation: 0,
        scale: 0.8
      }).addKeyFrame('goal_scored', {
        time: 1800,
        position: createVector(0, 0),
        rotation: 0,
        scale: 0
      })

      // this.player_animator.addKeyFrame('idle', {
      //   time: 0,
      //   position: createVector(0, 0),
      //   rotation: 0,
      //   scale: 1
      // }).addKeyFrame('idle', {
      //   time: 300,
      //   position: createVector(0, -3),
      //   rotation: 0,
      //   scale: 1.02
      // })

      setInterval(()=>{
        if(this.time <= 0)
            this.matchEnd()
        else this.time -= 1
      }, 1000)
    }

    matchEnd(){
        noLoop()
    }
  
    // method to update player 1 score
    player1_scored() {
      this.player1Score += 1;
      // this.goal_scored()

      this.score_animator.play('goal_scored')
    }
  
    // method to update player 2 score
    player2_scored() {
      this.player2Score += 1;
      // this.goal_scored()
    }


    update(){
      // Very important implementation choice
      this.scored_goal_text.pos = this.scored_goal_text.pos.copy()

      this.score_animator.update()
    }
  
    // method to display score on screen
    show() {
        layer_manager.addAsset(20, {    //debug colliders
            "draw": () => {
              push()
              translate(this.position)
              image(this.image, 0, 0, this.image.width/2, this.image.height/2); // display score image
    
              noStroke()
              fill(38,36,31)
              rect(-102, -21, 71, 55, 5)   //HARDCODED    left result backgorund 
              rect(-102 + 131, -21, 71, 55, 5)   //HARDCODED     right result background
              rect(-28, -11, 55, 38, 5)     //center backgournd

              fill(150,158,53);
              textFont(ssd_font);
              textAlign(CENTER, CENTER);
              textSize(48);
              text(this.player1Score, -75, 1); // display player 1 score
              text(this.player2Score, 54, 1 ); // display player 2 score

              fill(200)
              textSize(32);
              text(this.time, 0, 6 ); // display time left 
              pop()
            }
          }).addAsset(0, {    //debug colliders
            "draw": () => {
              push()
              textSize(96);
              fill(247, 178, 17);
              textAlign(CENTER);
              textFont(goal_font)
              text("GOALLL", 0, 0 ); 
              pop()
          },
            'pos' : this.scored_goal_text.pos,
            'scale': this.scored_goal_text.scale
          })
        
         
     
    }
  }
  