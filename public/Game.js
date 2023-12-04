
let WIDTH, HEIGHT;    //canvas dimensions

let pauseModal, playerNameConflictModal;
let soundManager;
let goal_font;
let ssd_font;
let deltatime 

let globalSettings, playersData;

function preload() {
  // Load the resources
  ssd_font = loadFont('fonts/Digital-7.ttf');
  goal_font = loadFont('fonts/KGSummerSunshineBlackout.ttf');
  globalSettings = loadJSON('config/global_settings.json');

}


function setup() {
  sceneManager = new SceneManager();

  (async () => {
    await sceneManager.addScene(new GameScene1());
    await sceneManager.addScene(new MainMenuScene());
    await sceneManager.addScene(new PreMatchScene());
    await sceneManager.addScene(new SettingsScene());
    await sceneManager.addScene(new ResultsScene());
    await sceneManager.addScene(new AboutScene());
    await sceneManager.addScene(new MatchEndScene());
    await sceneManager.addScene(new ControlsScene());
    await sceneManager.addScene(new RegisterPlayerScene());
    await sceneManager.addScene(new PlayerSelectionScene());
    await sceneManager.addScene(new LoadScene());
    // await sceneManager.showScene("MainMenuScene");
    await sceneManager.showScene("LoadScene");
  })();

  document.addEventListener('visibilitychange', handleVisibilityChange);
  pauseModal = new PauseModal();
  playerNameConflictModal = new PlayerNameConflictModal();

  initialSaveData('global_settings', globalSettings);        //Save if initially doesnt exist in Local memory
  initialSaveData('players_data', []);
  globalSettings = retrieveData('global_settings');
  playersData = retrieveData('players_data');

  //globalSetting and playerData are pulled from local storage

  // soundManager.setGlobalSoundLevel(globalSettings.backgroundVolume);
  // soundManager.setEffectsSoundLevel(globalSettings.effectsVolume);
  // if(globalSettings.mutedBackgroundVolume) soundManager.setGlobalSoundLevel(0);   //mute
  // if(globalSettings.mutedEffectsVolume) soundManager.setEffectsSoundLevel(0);


  //Delete all stored players 
  // deleteData('players_data');
  // initialSaveData('players_data', []);

  console.log(playersData)
}


function draw(){
  clear();
  translate(WIDTH/4, HEIGHT/4);

  //after pausing the game, the first frame time goes incredibly low
  if(deltaTime/1000 > 1/20) 
    deltatime = 1/1000;
  else
    deltatime  = deltaTime * 60 / 1000;

  sceneManager.update();
  sceneManager.display();

}


function handleVisibilityChange() {
  if(!soundManager) return;
  
  if (document.hidden) {
    // noLoop();
    if(sceneManager.getActiveSceneName() == "GameScene1")
      pauseModal.showModal();
      soundManager.pausePlayingCurrentBackgroundSound();
  } else {
    // The user switched back to the tab
    // You can resume your game or do something else here
    console.log('User switched back to the tab');
    soundManager.continuePlayingCurrentBackgroundSound();
  }
}


document.addEventListener('keydown', function(event) {
  sceneManager.keyPressed(event); // Forward the keyPressed event to the active scene
});

document.addEventListener('keyup', function(event) {
  sceneManager.keyReleased(event); // Forward the keyReleased event to the active scene
});

document.addEventListener('mousedown', function(event) {
  sceneManager.mousePressed(event); // Forward the mousePressed event to the active scene
});


function initialSaveData(name, data){

  if (!localStorage.getItem(name)) {
    localStorage.setItem(name, JSON.stringify(data));
    // console.log('Data saved:', data);
  } else {
    // console.log('Data already exists in localStorage:', JSON.parse(localStorage.getItem(name)));
  }

}


function saveData(name, data) {
  // let data = { score: 180, playerName: 'Alekasandar' };
  localStorage.setItem(name, JSON.stringify(data));
  // console.log('Data saved:', data);
}

function deleteData(name){
  localStorage.removeItem(name);
}

function retrieveData(name) {
  let savedData = JSON.parse(localStorage.getItem(name));
  // console.log('Data retrieved:', savedData);
  return savedData;
}


function getImageSrcForPlayerType(avatar_type){
  let src = "soccer asseets/head1.png";
  switch (avatar_type) {
    case "FAST_PLAYER":
      src = "soccer asseets/player_icons/head1.png";
    break;

    case "JUMPY_PLAYER":
      src = "soccer asseets/player_icons/head2.png";
    break;

    case "ENDURANT_PLAYER":
      src = "soccer asseets/player_icons/head4.png";
    break;
    
    case "STRONG_PLAYER":
      src = "soccer asseets/player_icons/head3.png";
    break;

    default:
    break;
  }

  return src;
}