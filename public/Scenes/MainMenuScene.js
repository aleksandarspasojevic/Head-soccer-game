class MainMenuScene extends Scene {
  constructor() {
    super("MainMenuScene");
    WIDTH = 1920;
    HEIGHT = 978;

    this.startButton = null;
  }

  async preloadPromise() {
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

    this.layer_manager = new LayerManager();

    this.initUI(); 

    //globalSetting are pulled from local storage
    globalSettings = retrieveData('global_settings');
    
    soundManager.setGlobalSoundLevel(globalSettings.backgroundVolume);
    soundManager.setEffectsSoundLevel(globalSettings.effectsVolume);
    if(globalSettings.mutedBackgroundVolume) soundManager.setGlobalSoundLevel(0);   //mute
    if(globalSettings.mutedEffectsVolume) soundManager.setEffectsSoundLevel(0);


    soundManager.playMenuSound();
    
  }

  

  onExit() {
    // Clean up anything specific to the MenuScene when it becomes inactive
    this.startButton.remove();
    this.settingsButton.remove();
    this.resultsButton.remove();
    this.aboutButton.remove();
    this.controlsButton.remove();
    this.manualButton.remove();
  }

  initUI(){
    //Pairs of button names and callback activation funtions
    this.buttons = {
      "Start": async () => {
        await sceneManager.showScene("PreMatchScene");
      },
      "Settings": async () => {
        await sceneManager.showScene("SettingsScene");
      },
      "Results": async () => {
        await sceneManager.showScene("ResultsScene");
      },
      "Controls": async () => {
        await sceneManager.showScene("ControlsScene");
      },
      "Manual": async () => {
        //Open up the prilog A form the link
        let manualReference = 'https://1drv.ms/b/s!ArWcmp2Wwcdxm6YnNL-8mzKIADqhRw?e=YJC5nV';
        window.open(manualReference, '_blank'); // '_blank' opens the link in a new tab
      },
      "About": async () => {
        await sceneManager.showScene("AboutScene");
      },
    };

    // Create the start button
    this.startButton = this.createButton("Start", createVector(width / 2 - 50, height / 2 - 100), this.buttons["Start"]);

    this.settingsButton = this.createButton("Settings", createVector(width / 2 - 50, height / 2 - 50), this.buttons["Settings"]);

    this.resultsButton = this.createButton("Results", createVector(width / 2 - 50, height / 2 ), this.buttons["Results"]);

    this.controlsButton = this.createButton("Controls", createVector(width / 2 - 50, height / 2 + 50), this.buttons["Controls"]);

    this.manualButton = this.createButton("Manual", createVector(width / 2 - 50, height / 2 + 100), this.buttons["Manual"]);

    this.aboutButton = this.createButton("About", createVector(width / 2 - 50, height / 2 + 150), this.buttons["About"]);

    
    this.selectedButtonIndex = 0; // Initialize the selected button index
    this.buttonsArray = [
      this.startButton,
      this.settingsButton,
      this.resultsButton,
      this.controlsButton,
      this.manualButton,
      this.aboutButton
    ];


    // //TEST MODE -- WORMHOLE TO GAME SCENE WITH TEST PLAYERS 
    // const player1Data = {
    //   'avatar': 'FAST_PLAYER',
    //   'name': 'Test player 1',
    //   'matchesWon': 0,
    //   'matchesDrawn': 0,
    //   'matchesLost': 0,
    //   'goalDifference': 0,
    //   'goalsScored': 0,
    // }

    // const player2Data = {
    //   'avatar': 'STRONG_PLAYER',
    //   'name': 'Test player 1',
    //   'matchesWon': 0,
    //   'matchesDrawn': 0,
    //   'matchesLost': 0,
    //   'goalDifference': 0,
    //   'goalsScored': 0,
    // }


    // const params = {
    //   player1Data: player1Data,
    //   player2Data: player2Data,
    //   selectedTerrainName: 'RAIN_TERRAIN'
    // }


    // sceneManager.showScene("GameScene1", params);
    

  }


  update() {
    // Update logic for the MenuScene
  }

  display() {
    // Draw the MenuScene elements

    this.layer_manager.addAsset(-1, {
      'img' : NIGHT_TERRAIN_IMG,
      'img_pos': createVector(0, 0),
      'scale' : 0.5
    }).addAsset(0, {   
      "draw": () => {
        push();
        fill(247,219,140);

        textFont(goal_font);
        textAlign(CENTER, CENTER);
        textSize(44);

        text("HEAD SOCCER", 0, -HEIGHT/6);
        pop(); 
      }
    });

    

    this.layer_manager.displayLayers();
  }


  //HANDLE THE MOUSE CLICK ON CANVAS FOR ACTIVATING SOUND 
  mousePressed(event){
    soundManager.pausePlayingCurrentBackgroundSound();
    soundManager.continuePlayingCurrentBackgroundSound();
  }


  //HANDLE THE BUTTON MENU CONTROLS
  keyPressed(event) {
    // console.log(event)

    if (event.keyCode === UP_ARROW) {
      this.selectedButtonIndex =
        (this.selectedButtonIndex - 1 + this.buttonsArray.length) %
        this.buttonsArray.length;
    }
    else if (event.keyCode === DOWN_ARROW) {     // Check if the down arrow key was pressed
      this.selectedButtonIndex =
        (this.selectedButtonIndex + 1) % this.buttonsArray.length;
    }
    else if (event.keyCode === ENTER) {
      const selectedButton = this.buttonsArray[this.selectedButtonIndex];

      const buttonName = selectedButton.html();
      
      if (this.buttons.hasOwnProperty(buttonName)) {
        this.buttons[buttonName]();                            //Call callback method on button activation
      }
    }
    
    

    for (let i = 0; i < this.buttonsArray.length; i++) {
      if (i === this.selectedButtonIndex) {
        this.buttonsArray[i].style("background-color", "#45a049");
      } else {
        this.buttonsArray[i].style("background-color", "#4CAF50");
      }
    }

  }

}