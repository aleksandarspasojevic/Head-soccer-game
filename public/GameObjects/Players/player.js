
//PLAYER MAX ATTRIBUTES
MAX_PLAYER_ENERGY = 100
MAX_PLAYER_SPEED = 9;
MAX_PLAYER_JUMP_STRENGTH = 17;
MAX_PLAYER_ENDURANCE = 100;
MAX_PLAYER_SHOOT_INTENSITY = 18;
MAX_PLAYER_REPAIR_RATE = 12/60;

class Player {
    constructor(x, y, size, imgs, terrain, ball, pickupActivator, playerName = 'player1') {
      this.pos = createVector(x, y);
      this.scale = 1;
      this.initalSize = size;
      this.size = size * this.scale;
      this.width = this.size * 2   //width and height of player
      this.height = this.size * 3
      this.velocity = createVector(0, 0);
      this.acc = createVector(0, GRAVITY);
      this.defaultJumpStrength = 8;
      this.jumpStrength = this.defaultJumpStrength;
      this.images = imgs;
      this.terrain = terrain
      this.ball = ball
      this.pickupActivator = pickupActivator
      this.playerName = playerName
      this.jumping = false;
      this.energy = MAX_PLAYER_ENERGY;
      this.energyRepairRate = 3/60;
      this.energyRunDrainRate = 2/60;
      this.energyJumpDrainAmount = 1;
      this.energyShootDrainAmount = 2;
      this.energyKickStrength = 1;
      this.shoot_angle = PI/3;
      this.PLAYER_SPEED = 4;
      this.PLAYER_SHOOT_INTENSITY = 10;
      this.lockControls = false;    //lock player controls
      this.inverted = false;

      this.opponentPlayer = null;

      //create item collection for pickups and pickups
      if(this.playerName == 'player1'){
        this.itemCollection = new ItemCollection(this, createVector(-WIDTH/4, -HEIGHT/4));
      }else if(this.playerName == 'player2'){
        this.itemCollection = new ItemCollection(this, createVector(WIDTH/4, -HEIGHT/4), PI -PI/18, PI - 1.1 * PI/2, PI - PI/6);
      }

      //add default items for each player
      this.itemCollection.collectItem(new FreezePowerup(ICE_CUBE, createVector(0,0)));   //default loaction
      this.itemCollection.collectItem(new RocketPowerup(ROCKET_IMG, createVector(0,0)));   
      this.itemCollection.collectItem(new BigPlayerPowerup(GROW_SERUM, createVector(0,0)));   
      this.itemCollection.collectItem(new FanPowerup(FAN_IMG, createVector(0,0)));   
      
      //modifier manager
      this.modifierManager = new ModifierManager(this);

      // player sub-objects 
      this.head = {
        ...this.images.head, 
        pos: this.pos.copy(), 
        rot: 0, 
        scale: 1
      }

      this.body = {
        ...this.images.body, 
        pos: this.pos.copy(), 
        rot: 0, 
        scale: 1
      }

      this.foot = {
        ...this.images.foot, 
        pos: this.pos.copy(), 
        rot: 0, 
        scale: 1
      }

      //HARDCODED constants as OFFSETS for colliders 
      // Define colliders
      this.headCollider = new CircleCollider(this.pos.copy().mult(this.scale), 20 * this.scale, createVector(0, -15).mult(this.scale));
      this.bodyCollider = new RectCollider(this.pos.copy().mult(this.scale), this.width*0.8, this.height/3, this.images.foot.img_pos.copy().mult(this.scale).add(createVector(0, -5)));

      // Foot colliders are defined for each player separatelly
      if(this.playerName == 'player1')
        this.footCollider = new RectCollider(this.pos.copy().mult(this.scale), this.width*0.8, this.height/2, this.images.foot.img_pos.copy().mult(this.scale).add(createVector(20, -5)));
      else
        this.footCollider = new RectCollider(this.pos.copy().mult(this.scale), this.width*0.8, this.height/2, this.images.foot.img_pos.copy().mult(this.scale).add(createVector(-20, -5)));


      this.updateScale();

      //ANIMATIONS keyframes
      this.player_animator = new Animator(this.head);
      this.head_animator = new Animator(this.head);
      this.foot_animator = new Animator(this.foot);


      this.player_animator.addKeyFrame('idle', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      }).addKeyFrame('idle', {
        time: 300,
        position: createVector(0, -3),
        rotation: 0,
        scale: 1.02
      })
      .addKeyFrame('idle', {
        time: 600,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      })

      if(this.playerName == 'player1'){
        this.foot_animator.addKeyFrame('shoot', {
          time: 0,
          rotation: 0,
          scale: 1
        }).addKeyFrame('shoot', {
          time: 150,
          position: createVector(0, 0),
          rotation: -PI/3.5,
          scale: 1
        })
        .addKeyFrame('shoot', {
          time: 180,
          rotation: -PI/10,
          scale: 1
        })
        .addKeyFrame('shoot', {
          time: 370,
          rotation: 0,
          scale: 1
        })
      }else{
        this.foot_animator.addKeyFrame('shoot', {
          time: 0,
          rotation: 0,
          scale: 1
        }).addKeyFrame('shoot', {
          time: 150,
          position: createVector(0, 0),
          rotation: PI/3.5,
          scale: 1
        })
        .addKeyFrame('shoot', {
          time: 180,
          rotation: PI/10,
          scale: 1
        })
        .addKeyFrame('shoot', {
          time: 370,
          rotation: 0,
          scale: 1
        })
      }
      


      this.head_animator.addKeyFrame('shoot', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      }).addKeyFrame('shoot', {
        time: 150,
        position: createVector(0, 0),
        rotation: PI/8,
        scale: 1
      }).addKeyFrame('shoot', {
        time: 180,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      })

      this.head_animator.addKeyFrame('downfall', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      }).addKeyFrame('downfall', {
        time: 150,
        position: createVector(0, 5),
        rotation: 0,
        scale: 1
      }).addKeyFrame('downfall', {
        time: 260,
        position: createVector(0, -1),
        rotation: 0,
        scale: 1
      }).addKeyFrame('downfall', {
        time: 350,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      })

      this.head_animator.addKeyFrame('pushing', {
        time: 0,
        position: createVector(0, 0),
        rotation: 0,
        scale: 1
      }).addKeyFrame('pushing', {
        time: 60,
        position: createVector(1, 0),
        rotation: 0.01,
        scale: 1
      }).addKeyFrame('pushing', {
        time: 120,
        position: createVector(-1, 0),
        rotation: 0,
        scale: 1
      })
      
      this.player_animator.play('idle', true, true);
    }
  
    show() {
      layer_manager.addAsset(1, {
        "draw": () => {    //ball shadowing
          if(!this.terrain) return;

          push()
          const terrainHeight = this.terrain.terrainHeightAt(this.pos.x)
          let height = terrainHeight - this.height/2 - this.pos.y
          // print(height)
          translate(this.pos.x, terrainHeight)
          noStroke()
          let ball_shadow_scale = constrain(map(height, 80, 0, 0.0, 1), 0,1)
          fill(0, 0, 0, 80 * ball_shadow_scale)
          ellipse(0, 0, 2 * this.size * ball_shadow_scale, this.size *0.8 * ball_shadow_scale)
          pop()
        }
      })

      this.itemCollection?.show();
      this.modifierManager?.show();

      
      // Draw colliders for debugging
      // this.bodyCollider.show();
      // this.headCollider.show();
    }
  
    update() {
      // let deltatime = deltaTime * 60 / 1000;
      
      // Apply acceleration to velocity
      this.velocity.add(this.acc.copy().mult(deltatime));
  
      // Apply velocity to position, taking energy level into account
      let vel = this.velocity;
      vel.x = map(this.energy, -3*MAX_PLAYER_ENERGY, MAX_PLAYER_ENERGY, 0, this.velocity.x);
      // Constrain max speed on x axis
      if(abs(vel.x) > this.PLAYER_SPEED) vel.x *= this.PLAYER_SPEED /abs(vel.x);

      this.pos.add(vel.copy().mult(deltatime));
      // console.log(vel.x);
  
      // Player is on ground, his velocity is 0
      if(this.isOnGround()){
        if(this.jumping) this.landed();
        this.jumping = false;
        this.velocity.y = 0
      }

      this.updateEnergy(deltatime);

      //foot intertia effect
      this.foot.rot = constrain(map(this.velocity.x, -this.PLAYER_SPEED, this.PLAYER_SPEED, -PI/8, PI/10), -PI/8, PI/10);
      
      // Check collision with ball
      if (this.headCollider.inCollision(this.ball.collider)) {
        // console.log("head");

        var dir = p5.Vector.sub(this.ball.collider.position, this.headCollider.position);
        var d = dir.mag();
        dir.normalize();
        var corr = (this.ball.collider.radius + this.headCollider.radius - d);
        this.ball.collider.position.add(dir.copy().mult(corr));
        let impactAngle = this.ball.getImpactAngle(this.headCollider);
        this.ball.setVelocityFromAngle(impactAngle, this.ball.velocity.mag() + this.velocity.mag());
        this.head_animator.play('shoot');

        soundManager.playBallPlayerHeadImpactSound();
      }

      // Handle collision with other player 
      this.handlePlayerCollision(this.opponentPlayer);
      this.handlePowerupCollision();

      if (this.bodyCollider.inCollision(this.ball.collider)) {
        // console.log("BODY")

        let impactAngle = this.ball.getImpactAngle(this.bodyCollider);
        this.ball.setVelocityFromAngle(impactAngle, this.ball.velocity.mag() + this.velocity.mag() * 0.2);

        // soundManager.playBallPlayerHeadImpactSound();
      }

      // Constrain player position within terrain bounds
      this.pos.set(
        constrain(this.pos.x, this.terrain.leftBound + this.width/2, this.terrain.rightBound - this.width/2),
        constrain(this.pos.y, this.terrain.topBound, this.terrain.bottomBound - this.height/2)
      );
      
      // All players children objects should be poisiton updated by physics engine
      this.head.pos.set(this.pos)
      this.body.pos.set(this.pos)
      this.foot.pos.set(this.pos)


      // Update the animator  (it animates player children relatively to physics engine calculations)
      this.head_animator.update();
      this.foot_animator.update();
      this.player_animator.update();
      this.itemCollection.update();


      this.updateScale();

      this.headCollider.setPosition(this.pos)
      this.bodyCollider.setPosition(this.pos)
      this.footCollider.setPosition(this.pos)

      this.modifierManager.update();
    }

    updateScale(){
      // UPDATE player scaling system
      this.size = this.initalSize * this.scale;
      this.width = this.size * 2  
      this.height = this.size * 3

      // Reinitialize colllider sizes and positions
      
      this.headCollider.initCollider(this.pos.copy().mult(this.scale), 20 * this.scale, createVector(0, -15).mult(this.scale));
      this.bodyCollider.initCollider(this.pos.copy().mult(this.scale), this.width*0.8, this.height/3, this.images.foot.img_pos.copy().mult(this.scale).add(createVector(0, -5)));
      if(this.playerName == 'player1'){
        this.footCollider.initCollider(this.pos.copy().mult(this.scale), this.width*0.8, this.height/2, this.images.foot.img_pos.copy().mult(this.scale).add(createVector(20, -5)));
      }
      else{
        this.footCollider.initCollider(this.pos.copy().mult(this.scale), this.width*0.8, this.height/2, this.images.foot.img_pos.copy().mult(this.scale).add(createVector(-20, -5)));
      }
    }

    updateAnimations(){
      this.head.pos.set(this.pos)     //Keep the body part positions
      this.body.pos.set(this.pos)
      this.foot.pos.set(this.pos)

      this.head_animator.update();
      this.foot_animator.update();
      this.player_animator.update();
    }

    handlePlayerCollision(other) {
      let distanceVect = p5.Vector.sub(other.headCollider.position, this.headCollider.position);
  
      let distanceVectMag = distanceVect.mag();
  
      let minDistance = this.headCollider.radius + other.headCollider.radius;
  
      if (distanceVectMag < minDistance) {
        let distanceCorrection = (minDistance - distanceVectMag) / 2.0;
        let d = distanceVect.copy();
        let correctionVector = d.normalize().mult(distanceCorrection);
        other.pos.add(correctionVector);
        this.pos.sub(correctionVector);

        //play pushing animation
        if(this.velocity.copy().mult(other.velocity).x < 0){
          if(!this.head_animator.playing())
            this.head_animator.play('pushing', true);
        }
        else
          this.head_animator.stop();
        
      }
  
    }

    handlePowerupCollision() {
      for(let pickup of this.pickupActivator.pickups){
        if(this.bodyCollider.inCollision(pickup.pickupCollider) || this.headCollider.inCollision(pickup.pickupCollider))
          this.pickupActivator.collect(this, pickup);           //This player picked a pickup
      }
    }

    updateEnergy(deltatime){
      if(this.velocity.x == 0)  //standing still
        this.energy = Math.min(this.energy+this.energyRepairRate*deltatime, MAX_PLAYER_ENERGY);
      else  //player is running
        this.drainEnergy(this.energyRunDrainRate*deltatime);
      
      // console.log(this.energy)
      
    }
  
    shootBall(shoot_angle){
      let angle = this.shoot_angle;
      if(shoot_angle !== undefined) angle = shoot_angle;

      if(this.playerName == 'player2') angle = PI - angle;

      if (this.footCollider.inCollision(this.ball.collider)) {     //ball is in field for shoot
        // console.log("SHOOT")

        this.ball.setVelocityFromAngle(angle, this.PLAYER_SHOOT_INTENSITY);

        //drain shoot energy
        this.drainEnergy(this.energyShootDrainAmount);

        soundManager.playShootSound();
      }

      if(this.footCollider.inCollision(this.opponentPlayer.bodyCollider)){
        // console.log("KICK");
        this.opponentPlayer.drainEnergy(this.energyKickStrength);
        this.drainEnergy(this.energyKickStrength/5);   //Player that kicks uses 5 times less energy

        soundManager.playPlayerHurt();
      }
        
    }

    drainEnergy(amount){
      this.energy = Math.max(this.energy-amount, 0);
    }

    gainEnergy(amount){
      this.energy = Math.min(this.energy+amount, MAX_PLAYER_ENERGY);
    }

    landed(){
      this.head_animator.play('downfall');
      soundManager.playDownfallSound();
    }
  
    jump() {
      if(this.lockControls) return;
      // Only jump if player is on the ground
      if (this.isOnGround()) {
        this.jumping = true;
        this.velocity.y = -this.jumpStrength;

        //consume jump energy
        this.energy = Math.max(this.energy-this.energyJumpDrainAmount, 0);
      }
    }

    //effects part
    applyModifier(modifier) {
      return this.modifierManager.applyModifier(modifier);
    }

    //freeze player controls 
    freeze(){
      this.setHorizontalAcceleration(0);
      this.setSpeedX(0);
      this.lockControls = true;
    }

    unfreeze(){
      this.lockControls = false;
    }

    disableGravity(){
      this.acc.y = 0;
    }

    enableGravity(){
      this.acc.y = GRAVITY;
    }
  
    applyForce(force) {
      if(this.lockControls) return;
      // Apply force to acceleration
      this.acc.add(force);
    }
  
    isOnGround() {
      const w = (this.width/2)*0.3;      //percentage of players body standing on the platform
      return (
        this.pos.y + this.height/2 + 1> this.terrain.terrainHeightAt(this.pos.x + w) ||
        this.pos.y + this.height/2 + 1> this.terrain.terrainHeightAt(this.pos.x - w)
      );
    }

    
    setHorizontalAcceleration(acc){
      if(this.lockControls) return;
      this.acc.x = acc
    }

    setPosition(pos){
      this.pos.set(pos);
    }

    setVelocity(vel) {
      if(this.lockControls) return;
      this.velocity = vel;
    }

    setSpeedX(speed){
      if(this.lockControls) return;
      this.velocity.x = speed;
    }

    setScale(scale){
      this.scale = scale;
      this.updateScale();
    }

    getScale(){
      return this.scale;
    }

    setInvert(inverted){ this.inverted = inverted; }            //Invert the assets being displayed

    setJumpStrength(strength){ this.jumpStrength = strength; }

    restoreDefaultJumpStrength(){ this.jumpStrength = this.defaultJumpStrength; }

    setOpponentPlayer(player){
      this.opponentPlayer = player;
    }

    getOpponentPlayer(){
      return this.opponentPlayer;
    }

  }