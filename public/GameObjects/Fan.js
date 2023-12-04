class Fan {
    constructor(pos, ball, blowDirection = true) {
        this.position = pos;
        this.ball = ball;
        this.enabled = false;
        this.fanBlowForce = 0.2;
        this.bladeLength = 100;
        this.rotationSpeed = 0.1;
        this.numBlades = 5;
        this.viewAngle = 20;
        this.a = 40;
        this.b = 100;
        this.angle = 0;

        // Create the fan's area of effect for blowing the ball
        if (!blowDirection) {
            this.fanBlowForce *= -1; // Reverse blow force if fan is blowing from right to left
            this.fanAffectArea = new RectCollider(this.position.copy().add(-150, 0), 400, 300);
        } else {
            this.fanAffectArea = new RectCollider(this.position.copy().add(150, 0), 400, 300);
        }

        this.particleSystemManager = new ParticleSystemManager();


        const rectangularSource = new RectangularSource(this.position.x, this.position.y, 1, 200);
        if (!blowDirection) 
            rectangularSource.setVeloctyAngle(PI);
        else 
            rectangularSource.setVeloctyAngle(0);
        

        rectangularSource.setRandomizeVelocityDirection(false);
        rectangularSource.setMagnitudeInterval(4, 9)
        const particleSystem = new AirParticleSystem(rectangularSource, 10, 5, 1, true);
        particleSystem.disableGravity();
        particleSystem.start();
        particleSystem.playBurst();
        this.particleSystemManager.addParticleSystem(particleSystem);

    }

    update() {
        //Instantiate particle system effects 
        if (!this.enabled) {
            return;
        }
        this.particleSystemManager.update();

        // Rotate the fan blades
        this.angle += this.rotationSpeed;

        if (this.fanAffectArea.inCollision(this.ball.collider)) {
            // Calculate the distance between the fan's position and the ball's position
            let ballFanDistance = dist(this.position.x, this.position.y, this.ball.pos.x, this.ball.pos.y);

            // Map the distance to a blow intensity
            let blowIntensity = map(ballFanDistance, 0, this.fanAffectArea.width, this.fanBlowForce, this.fanBlowForce / 20);

            // Apply horizontal acceleration to the ball based on the blow intensity
            this.ball.setHorizontalAcceleration(blowIntensity);
        } else {
            // Reset the ball's horizontal acceleration if not in the fan's area of effect
            this.ball.setHorizontalAcceleration(0);
        }
    }

    show() {
        
        if (!this.enabled) {
            return;
        }
        this.particleSystemManager.show();

        // Display the rotating fan blades and the area of effect
        layer_manager.addAsset(10, {
            "draw": () => {
                for (let i = 0; i < this.numBlades; i++) {
                    const angleOffset = TWO_PI / this.numBlades * i;

                    // Calculate the position of the rotating point based on the angle
                    let rotatingPointX = this.position.x + this.a * cos(this.angle + angleOffset);
                    let rotatingPointY = this.position.y + this.b * sin(this.angle + angleOffset);

                    push();
                    fill(0);
                    strokeWeight(7);
                    line(this.position.x, this.position.y, rotatingPointX, rotatingPointY);
                    pop();
                }
            }
        }).addAsset(100, {
            // Display the fan's area of effect for debugging
            "draw": () => {
                // push();
                // stroke(0, 255, 0);
                // noFill();
                // rectMode(CENTER);
                // rect(this.fanAffectArea.position.x, this.fanAffectArea.position.y, this.fanAffectArea.width, this.fanAffectArea.height);
                // pop();
            }
        });

        
    }

    enable() {
        // Enable the fan's functionality
        this.enabled = true;

        soundManager.playFanSound();
    }

    disable() {
        // Disable the fan's functionality and reset the ball's horizontal acceleration
        this.enabled = false;
        this.ball.setHorizontalAcceleration(0);

        soundManager.stopFanSound();
    }
}
