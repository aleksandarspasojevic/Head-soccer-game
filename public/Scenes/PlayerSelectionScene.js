



class PlayerSelectionScene extends Scene {
    constructor() {
      super("PlayerSelectionScene");
      WIDTH = 1920;
      HEIGHT = 978;
  

      this.registerPlayerModal = new RegisterPlayerModal();
      this.layer_manager = new LayerManager();

      this.selectedPlayer = null;
      this.requestedPlayer = 'player1';     //By default requested player is left player
      this.opponentPlayerData = null;
      this.buttonList = [];
    }
  
    async preloadPromise() {
      // Load assets specific to the MenuScene
      // For example, you can use p5.js's loadSound, loadImage, etc.
      return new Promise((resolve) => {
        // For simplicity, we just use a setTimeout here to simulate async loading
        setTimeout(() => resolve(), 0);
      });
    }
  

    initScene(params){
      this.requestedPlayer = params.player;
      this.opponentPlayerData = params?.opponentPlayerData;
    }


    onEnter() {
      // Set up anything specific to the MenuScene when it becomes active
      const canvas = createCanvas(WIDTH/2, HEIGHT/2);
      canvas.id('myCanvas');
      imageMode(CENTER);
  
      //Pop up the table
      $('#playerSelectionTable').css('display', 'table');
      
      this.initUI();
    }
  

    initUI(){

      // Create the back button
      this.backButton = this.createButton("Cancel", createVector(WIDTH/4 - 200, HEIGHT*0.43),
        ()=>{
          (async () => {
            await sceneManager.showScene("PreMatchScene");
          })();
      });

      
      this.registerButton = this.createButton("Add player", createVector(WIDTH/4 - 40, HEIGHT*0.43),
        ()=>{
          (async () => {

            const params = {
              which: this.requestedPlayer
            }

            await sceneManager.showScene("RegisterPlayerScene", params);
          })();
      });


      let canvasContainer = select('.canvas-container'); // Get the canvas-container by its ID


      this.confirmButton = createButton('Confirm');
      this.confirmButton.class('btn btn-danger');
      this.confirmButton.parent(canvasContainer);
      this.confirmButton.position(WIDTH/4 + 120, HEIGHT*0.43);
      this.confirmButton.attribute('disabled', true); // Disables the button
      this.confirmButton.mousePressed(()=>{
        (async () => {
          //Confirmed
          // Pass the selected player to the PreMatchScene
          
          const params = {
            player: this.selectedPlayer,
            which: this.requestedPlayer
          }

          await sceneManager.showScene("PreMatchScene", params);
        })();
      }); 


      
      //Pull the playersData from localStorage
      playersData = retrieveData('players_data');

      this.clearTable();                   //Clear HTML context before adding new set of rows 
      for(let playerData of playersData){
        this.appendTableRow(getImageSrcForPlayerType(playerData.avatar), playerData.name, ()=>{
          // console.log(playerData.name);

          this.selectedPlayer = playerData;

          this.confirmButton.class('btn btn-success'); 
          this.confirmButton.removeAttribute('disabled'); 
        }); 
      }
      
      
    } 
  
    onExit() {
      // Clean up anything specific to the MenuScene when it becomes inactive
      this.backButton.remove();
      this.confirmButton.remove();
      this.registerButton.remove();
      //Remove the table visibility
      $('#playerSelectionTable').css('display', 'none');
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
            rect(-300, -200, 600, 420, 20); 
            fill(0);


            fill(0);
            textSize(32);
            textAlign(CENTER);
            text("CHOOSE PLAYER", 0, -HEIGHT/6);
            pop(); 
            }
        });

        this.layer_manager.displayLayers();
    }



    appendTableRow(imgSrc, playerName, callbackFunction){
      // Get the table body element by its IDs
      const tableBody = select('#playersTableBody');

      // Create a new table row element
      const row = document.createElement('tr');
      row.classList.add('row-class'); // Add your custom class here

      // Create table data cells for avatar, name, and button
      const avatarCell = document.createElement('td');
      avatarCell.classList.add('col-4'); // Add your custom class here

      const nameCell = document.createElement('td');
      nameCell.classList.add('col-4'); // Add your custom class here

      const buttonCell = document.createElement('td');
      buttonCell.classList.add('col-4'); // Add your custom class here

      // Create an image element for the avatar
      const avatarImage = createImg(imgSrc, "Avatar");
      avatarImage.size(30, 30);

      // Create a button element
      const button = createButton("Select");
      button.class("btn btn-light");

      //Disable selection for player who is already selected
      if(playerName == this.opponentPlayerData?.name){
        button.html('Selected');
        button.class('btn btn-danger');
        button.attribute('disabled', true); // Disables the button
      }else{
        this.buttonList.push(button);
      }

      // Set button click event if needed
      button.mousePressed(() => {
        for(let b of this.buttonList){
          b.html('Select');
          b.class("btn btn-light");
        }
        button.html('Selected');
        button.class('btn btn-success');
        callbackFunction();
      });

      // Append elements to cells
      avatarCell.appendChild(avatarImage.elt);
      nameCell.innerHTML = playerName; // Set player name
      buttonCell.appendChild(button.elt);

      // Append cells to the row
      row.appendChild(avatarCell);
      row.appendChild(nameCell);
      row.appendChild(buttonCell);

      // Append the row to the table body
      tableBody.child(row);
    }

    clearTable() {
      // Get the table body element by its ID
      const tableBody = select('#playersTableBody');
    
      // Remove all child elements (rows) from the table body
      tableBody.elt.innerHTML = '';
    }

    

  }