class Terrain {
    constructor(image) {
      this.image = image;

      //DEFULT TERRAIN BOUNDARIES
      this.leftBound = -image.width/4 *.8;
      this.rightBound = image.width/4 * .8;
      this.topBound = -image.height/4;
      this.bottomBound = image.height/4 * .65;

      //TERRAIN FRICTION COEFFICIENT
      this.FRICTION_COEFFICIENT = 0.8;   
      
      this.player1 = null;
      this.player2 = null;
    }

    //Write general updating code
    update(){

    }       
  
    show() {
      
      layer_manager.addAsset(-1, {
        'img' : this.image,
        'img_pos': createVector(0, 0),
        'scale' : 0.5
      });
      
    }


    terrainHeightAt(xPos){               //If terrain is flat, than terrain height is uniform and equal to bottomBoundary
      return this.bottomBound; 
    }


    setPlayers(player1, player2){
      this.player1 = player1;
      this.player2 = player2;
    }

    
    getNormal(position) {
      // Find the closest point on the terrain to the given position
      let closestX = constrain(position.x, this.leftBound, this.rightBound);
      let closestY = constrain(position.y, this.topBound, this.bottomBound);
  
      // Calculate the normal vector at the closest point
      let normalX = -1 * (this.image.get(floor(closestX + this.image.width/4), floor(closestY + this.image.height/4)) & 0xff) / 255;
      let normalY = -1 * (this.image.get(floor(closestX + this.image.width/4), floor(closestY + this.image.height/4)) & 0xff) / 255;
  
      // Normalize the normal vector and return it
      let normal = createVector(normalX, normalY);
      normal.normalize();
      return normal;
    }

  }
  