

class NightTerrain extends Terrain {
    constructor(image, treeImage) {
        super(image);

        this.darknessIntensity = 200;
        this.tree_img = treeImage;          //TREE is an obstacle

        //Create object to be animated
        this.treeObstacle = {
          pos: createVector(WIDTH/4 - 125, -70), 
          rot: 0,
          scale: 0.5
      }
      
      this.treeObstacleActive = false;

      this.treeObstacleAnimator = new Animator(this.treeObstacle);
      const randomTimeGeneration = random(10000, 40000);                        //Obstacle is generated randomly between 10s and 40s
      const obstacleAppearTime = 2000;
      const obstacleDuration = 5000;

      this.treeObstacleAnimator.addKeyFrame('treeHidingMoon', {
          time: 0,
          position: createVector(100, 0)
      }).addKeyFrame('treeHidingMoon', {
          time: randomTimeGeneration,
          position: createVector(100, 0), 
          callOnceFunction: ()=>{
            this.treeObstacleActive = true;
          },
          callbackFunction: (timePassed)=>{
            //PROGRESS value goes from 0 to 1 
            const progress = timePassed / obstacleAppearTime;     //Animation progress between 2 keyFrames

            post_processing.setFade(map(progress, 0, 1, 13, this.darknessIntensity)); 
          }
      }).addKeyFrame('treeHidingMoon', {
          time: randomTimeGeneration + obstacleAppearTime,
          position: createVector(0, 0)
      }).addKeyFrame('treeHidingMoon', {
          time: randomTimeGeneration + obstacleAppearTime + obstacleDuration,
          position: createVector(0, 0), 
          callbackFunction: (timePassed)=>{
            const progress = timePassed / obstacleAppearTime;     //Animation progress between 2 keyFrames

            post_processing.setFade(map(progress, 0, 1, this.darknessIntensity, 13)); 
          }
      }).addKeyFrame('treeHidingMoon', {
          time: randomTimeGeneration + obstacleAppearTime + obstacleDuration + obstacleAppearTime,
          position: createVector(200, 0), 
          callOnceFunction: ()=>{
            this.treeObstacleActive = false;
          }
      })
      this.treeObstacleAnimator.play('treeHidingMoon', false, false); 

    }

    //Write general updating code
    update(){
      this.treeObstacleAnimator.update();
    }       
  
    show() {
      
      layer_manager.addAsset(-1, {
        'img' : this.image,
        'img_pos': createVector(0, 0),
        'scale' : 0.5
      });

      if(this.treeObstacleActive){
        layer_manager.addAsset(0, {
          'img' : this.tree_img,
          'img_pos': this.treeObstacle.pos, 
          'scale' : 0.5
        });
      }
      
    }


  }
  