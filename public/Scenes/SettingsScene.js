

class SettingsScene extends Scene {
    constructor() {
      super("SettingsScene");
      WIDTH = 1920;
      HEIGHT = 978;
  
      this.layer_manager = new LayerManager();

      this.BACKGROUND_SOUND_IMG;
      this.BACKGROUND_SOUND_MUTED_IMG;
      this.EFFECTS_SOUND_IMG;
    }
  
    async preloadPromise() {
      const imagePromises = [
        new Promise((resolve) => {
          this.BACKGROUND_SOUND_IMG = loadImage('soccer asseets/soundIcon.png', resolve);
        }),
        new Promise((resolve) => {
          this.BACKGROUND_SOUND_MUTED_IMG = loadImage('soccer asseets/soundIconMuted.png', resolve);
        }), 
        new Promise((resolve) => {
          this.EFFECTS_SOUND_IMG = loadImage('soccer asseets/effectsSoundIcon.png', resolve);
        })

      ];
    
      
      // Wait for all image to resolve
      await Promise.all([...imagePromises]);
    }
  
    onEnter() {
      // Set up anything specific to the MenuScene when it becomes active
      const canvas = createCanvas(WIDTH/2, HEIGHT/2);
      canvas.id('myCanvas');
      imageMode(CENTER);


      // "backgroundVolume"
      // "effectsVolume"
      // "mutedBackgroundVolume"
      // "mutedEffectsVolume"

      //Pull the globalSettings from the localStorage
      globalSettings = retrieveData('global_settings');

      this.backButton = this.createButton("Back", createVector(width / 2 - 40 - 70, height / 2 + 150),
        ()=>{
          (async () => {
            await sceneManager.showScene("MainMenuScene");
          })();
      });

      this.confirmButton = this.createButton("Confirm", createVector(width / 2 - 40 + 70, height / 2 + 150),
        ()=>{
          (async () => {
            saveData('global_settings', globalSettings);

            await sceneManager.showScene("MainMenuScene");
          })();
      });


      this.backgroundVolume = globalSettings.backgroundVolume*100;
      this.effectsVolume = globalSettings.effectsVolume*100;

      let canvasContainer = select('.canvas-container'); // Get the canvas-container by its ID
      
      //CREATE SLIDERS
      this.backgroundSlider = createSlider(0, 100, this.backgroundVolume);
      this.backgroundSlider.parent(canvasContainer);
      this.backgroundSlider.position(WIDTH/4 - this.backgroundSlider.width/2, 185);

      this.effectsSlider = createSlider(0, 100, this.effectsVolume);
      this.effectsSlider.parent(canvasContainer);
      this.effectsSlider.position(WIDTH/4 - this.effectsSlider.width/2, 285);


      //Disable the slider if its selected (Data pulled from localStorage)
      if(globalSettings.mutedBackgroundVolume) this.backgroundSlider.attribute('disabled', 'true');
      if(globalSettings.mutedEffectsVolume) this.effectsSlider.attribute('disabled', 'true');



      //CREATE MUTE CHECKBOXES
      this.muteBackgroundVolume = createCheckbox('', globalSettings.mutedBackgroundVolume);
      this.muteBackgroundVolume.parent(canvasContainer);
      this.muteBackgroundVolume.position(WIDTH/4 + 170, 180); 
      this.muteBackgroundVolume.changed(()=>{
        let isChecked = this.muteBackgroundVolume.checked();
        
       
        if(isChecked){
          this.backgroundSlider.attribute('disabled', 'true');
          soundManager.setGlobalSoundLevel(0);
        }
        else{
          this.backgroundSlider.removeAttribute ('disabled');
          soundManager.setGlobalSoundLevel(globalSettings.backgroundVolume);
        }
          

        globalSettings.mutedBackgroundVolume = isChecked;
      }); 

      
      this.muteEffectsVolume = createCheckbox('', globalSettings.mutedEffectsVolume);
      this.muteEffectsVolume.parent(canvasContainer);
      this.muteEffectsVolume.position(WIDTH/4 + 170, 280); 
      this.muteEffectsVolume.changed(()=>{
        let isChecked = this.muteEffectsVolume.checked();
        
        
        if(isChecked){
          soundManager.setEffectsSoundLevel(0);
          this.effectsSlider.attribute('disabled', 'true');
        }
        else{
          this.effectsSlider.removeAttribute ('disabled');
          soundManager.setEffectsSoundLevel(globalSettings.effectsVolume);
        }


        globalSettings.mutedEffectsVolume = isChecked;
        
      }); 



      // Add an event listener to update background volume
      this.backgroundSlider.input(() => {
        this.backgroundVolume = this.backgroundSlider.value();

        soundManager.setGlobalSoundLevel(this.backgroundVolume/100);

        globalSettings.backgroundVolume = this.backgroundVolume/100;
        // console.log(retrieveData('global_settings'));
      });
      
      // Add an event listener to update effects volume
      this.effectsSlider.input(() => {
        this.effectsVolume = this.effectsSlider.value();

        soundManager.setEffectsSoundLevel(this.effectsVolume/100);

        globalSettings.effectsVolume = this.effectsVolume/100;
        // console.log(retrieveData('global_settings'));
      });
  
    }
  
    
  
    onExit() {
      // Clean up anything specific to the MenuScene when it becomes inactive
      this.backButton.remove();
      this.confirmButton.remove();
      this.effectsSlider.remove();
      this.backgroundSlider.remove();
      this.muteBackgroundVolume.remove();
      this.muteEffectsVolume.remove();
    }
  
    update() {
      // Update logic for the MenuScene
    }
  
    display() {
      this.layer_manager.addAsset(-1, {
        'img' : NIGHT_TERRAIN_IMG,
        'img_pos': createVector(0, 0),
        'scale' : 0.5
      }).addAsset(0, {   
        "draw": () => {
            push();

            // Draw the MenuScene elements
            fill(200, 200, 200, 200);
            noStroke(); 
            rect(-250, -200, 500, 400, 20); 
            fill(0);
            textSize(32);
            textAlign(CENTER);
            textFont(goal_font);
            text("SETTINGS", 0, -150);

            textSize(14);
            textAlign(LEFT);
            text("MUSIC", -157 -75, -45);
            text("EFFECTS", -157 -75, 55);

            text("MUTE", 100, -45);
            text("MUTE", 100, 55);
            
            //Sound icons
            if(globalSettings.mutedBackgroundVolume)
              image(this.BACKGROUND_SOUND_MUTED_IMG, -157 + 30, -50, this.BACKGROUND_SOUND_MUTED_IMG.width * 0.88, this.BACKGROUND_SOUND_MUTED_IMG.height * 0.88);
            else
              image(this.BACKGROUND_SOUND_IMG, -150 + 30, -50, this.BACKGROUND_SOUND_IMG.width * 0.8, this.BACKGROUND_SOUND_IMG.height * 0.8);

            image(this.EFFECTS_SOUND_IMG, -153 + 30, 50, this.EFFECTS_SOUND_IMG.width * 0.75, this.EFFECTS_SOUND_IMG.height * 0.75);
            if(globalSettings.mutedEffectsVolume){
              push();
              translate(-153 + 30 - 20, 50 - 35/2);
              stroke(30);
              strokeWeight(4);
              line(0, 0, 40, 35);
              pop();
            }
              
           
            textAlign(CENTER);
            textSize(16);
            text(parseInt(this.backgroundVolume) + "%", 0, -80);
            text(parseInt(this.effectsVolume) + "%", 0, 20);

            pop(); 
            }
        });
  
      this.layer_manager.displayLayers();
    }
  }