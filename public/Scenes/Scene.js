class Scene {
  constructor(name) {
    this.name = name;
    this.ready = false; // Flag to indicate if the assets are loaded
  }

  async preloadPromise() {
    // Return a promise that resolves when all assets are loaded
    return new Promise((resolve) => {
      // Load any assets or resources needed for the scene here
      // For example, you can use p5.js's loadSound, loadImage, etc.
      // Resolve the promise when all assets are loaded.
      resolve();
    });
  }

  async loadAssets() {
    await this.preloadPromise();
    this.ready = true;
  }

  initScene(){
    // Set up anything specific to the scene before entering
  }

  onEnter() {
    // Set up anything specific to the scene when it becomes active
  }

  onExit() {
    // Clean up anything specific to the scene when it becomes inactive
  }

  update() {
    // Update logic for the scene
  }

  display() {
    // Draw the scene elements
  }

  keyPressed() {
    // Handle keyPressed event specific to the scene
  }

  keyReleased() {
    // Handle keyReleased event specific to the scene
  }

  mousePressed(){
    // Handle keyPressed event specific to the scene
  }

  createLeftArrowButton(position, callbackFunction){
    let canvasContainer = select('.canvas-container'); // Get the canvas-container by its ID
    const button = createButton();
    button.id('leftButton');
    button.parent(canvasContainer);
    
    button.position(position.x, position.y);
    button.size(100, 50);


    // Add interactivity
    button.mouseOver((()=>{
      button.style("border-color", "transparent #218838 transparent transparent"); // Set triangle color
    }).bind(this));

    button.mouseOut((()=>{
      // Change button color back when the mouse moves out
      button.style("border-color", "transparent #4CAF50 transparent transparent"); 
    }).bind(this));

    button.mousePressed(
      (()=>{
      
        callbackFunction();

    }).bind(this));

    return button;
  }

  createRightArrowButton(position, callbackFunction){
    let canvasContainer = select('.canvas-container'); // Get the canvas-container by its ID
    const button = createButton();
    button.id('rightButton');
    button.parent(canvasContainer);

    button.position(position.x, position.y);
    button.size(100, 50);

    // Add interactivity
    button.mouseOver((()=>{
      button.style("border-color", "transparent transparent transparent #218838"); // Set triangle color
    }).bind(this));

    button.mouseOut((()=>{
      // Change button color back when the mouse moves out
      button.style("border-color", "transparent transparent transparent #4CAF50");
    }).bind(this));

    button.mousePressed(
      (()=>{
      
        callbackFunction();

    }).bind(this));

    return button;
  }

  createButton(buttonText, position, callbackFunction){
    let canvasContainer = select('.canvas-container'); // Get the canvas-container by its ID
    const button = createButton(buttonText);
    button.id('button');
    button.parent(canvasContainer);

    button.position(position.x, position.y);
    const scale = 0.8;
    button.size(100 * scale, 50 * scale);
      

    // Add interactivity
    button.mouseOver((()=>{
      button.style("background-color", "#218838");
    }).bind(this));

    button.mouseOut((()=>{
      // Change button color back when the mouse moves out
      button.style("background-color", "#4CAF50");
    }).bind(this));

    button.mousePressed(
      (()=>{
      
        callbackFunction();

    }).bind(this));

    return button;
  }


}