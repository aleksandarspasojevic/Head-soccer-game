class Score {
    constructor(image, player1, player2, player1Data, player2Data) {
      this.image = image; // image reference for displaying score
      this.player1 = player1;    //Seferences to players for displaying its data
      this.player2 = player2;
      this.position = createVector(0, -200); // position of score image on screen
      this.player1Score = 0; // initial score for player 1
      this.player2Score = 0; // initial score for player 2
      this.player1Data = player1Data;
      this.player2Data = player2Data;
      this.goalScoredAnim = null
      this.time = 60;   //default match time is 60s

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
        scale: 0.6,
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
      }).addCallbackAtFinished(()=>{                      //Make sure that text is out of the screen after animation
        this.scored_goal_text.pos.set(-750, 50);
      }); 


      // this.timer = setInterval(()=>{
      //   if(this.time <= 0)
      //       this.matchEnd();
      //   else this.time -= 1;
      // }, 1000);

      this.pos = createVector(0,0);    //required by timer, no other purpose
      this.timer = new Animator(this);
      this.timer.addKeyFrame('timer', {
        time: 0,
      }).addKeyFrame('timer', {
        time: 1000,
        callbackFunction: (timePassed)=>{

          if(this.time <= 0)
            this.matchEnd();
          else this.time -= 1;

        }
      })
      
      this.timer.play('timer', false, true);

    }

    matchEnd(){
        // console.log("END");

        (async () => {
          const params = {
            player1Score: this.player1Score,
            player2Score: this.player2Score,
            player1Data: this.player1Data,
            player2Data: this.player2Data
          }
          
          await sceneManager.showScene("MatchEndScene", params);

        })();
        
        this.timer.stop();
        // clearInterval(this.timer);
    }
  
    // method to update player 1 score
    player1_scored() {
      this.player1Score += 1;
      // this.goal_scored()

      this.score_animator.play('goal_scored', true, false)

      soundManager.playGoalCheering();
    }
  
    // method to update player 2 score
    player2_scored() {
      this.player2Score += 1;
      // this.goal_scored()
      this.score_animator.play('goal_scored')

      soundManager.playGoalCheering();
    }


    update(){
      // Very important implementation choice
      this.scored_goal_text.pos = this.scored_goal_text.pos.copy()

      this.score_animator.update();
      this.timer.update();
    }
  
    // method to display score on screen
    show() {
      // console.log(this.scored_goal_text.pos)
        layer_manager.addAsset(20, {    //debug colliders
            "draw": () => {
              push()
              translate(this.position)
              image(this.image, 0, 0, this.image.width/2, this.image.height/2); // display score image
    
              //COVERS for the unwanted image parts
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
          }).addAsset(0, {    //energy bars
            "draw": () => {
              push()
              translate(this.position)

              let barHeight1 = map(this.player1.energy, 0, MAX_PLAYER_ENERGY, 51, 0);
              if(this.player1.energy < 30)
                fill(255, 0, 0);
              else if(this.player1.energy < 80)
                fill(237, 172, 21);
              else
                fill(0, 255, 0);

              rect(-126, -18 + barHeight1, 14, 51 - barHeight1)     //center backgournd

              let barHeight2 = map(this.player2.energy, 0, MAX_PLAYER_ENERGY, 51, 0);
              if(this.player2.energy < 30)
                fill(255, 0, 0);
              else if(this.player2.energy < 80)
                fill(237, 172, 21);
              else
                fill(0, 255, 0);
              rect(110, -18 + barHeight2, 14, 51 - barHeight2)     //center backgournd

              pop()
          }}).addAsset(0, {    //debug colliders
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
  