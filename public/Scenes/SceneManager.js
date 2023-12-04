class SceneManager {
  constructor() {
    this.scenes = {};
    this.activeScene = null;
  }

  async addScene(scene) {
    await scene.loadAssets(); // Wait for the scene's assets to load
    this.scenes[scene.name] = scene;
    return scene;
  }


  async showScene(sceneName, params) {
    if (this.activeScene) {
      this.activeScene.onExit();
    }
    this.activeScene = this.scenes[sceneName];
    if (!this.activeScene.ready) {
      await this.activeScene.loadAssets(); // Wait for the new scene's assets to load
    }

    //If parameters passed to another scene, call sceneInit method before entering
    if(params) this.activeScene.initScene(params);

    this.activeScene.onEnter();
    return this.activeScene;
  }

  isReady() {
    // Returns true if the active scene is ready (assets loaded)
    return this.activeScene && this.activeScene.ready;
  }

  update() {
    if (this.activeScene) {
      this.activeScene.update();
    }
  }

  display() {
    if (this.activeScene) {
      this.activeScene.display();
    }
  }

  keyPressed(event) {
    if (this.activeScene) {
      this.activeScene.keyPressed(event); // Forward the keyPressed event to the active scene
    }
  }

  keyReleased(event) {
    if (this.activeScene) {
      this.activeScene.keyReleased(event); // Forward the keyReleased event to the active scene
    }
  }

  mousePressed(event) {
    if (this.activeScene) {
      this.activeScene?.mousePressed(event); // Forward the mousePressed event to the active scene if its defined
    }
  }

  getActiveSceneName(){
    return this.activeScene.name;
  }

}