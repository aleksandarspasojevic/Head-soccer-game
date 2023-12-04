

class ResultsScene extends Scene {
    constructor() {
      super("ResultsScene");
      WIDTH = 1920;
      HEIGHT = 978;
  
      this.layer_manager = new LayerManager();
    }
  
    async preloadPromise() {
      // Load assets specific to the MenuScene
      // For example, you can use p5.js's loadSound, loadImage, etc.
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
  
      
      this.backButton = this.createButton("Back", createVector(width / 2 - 50, height / 2 + 175),
      ()=>{
        (async () => {
          await sceneManager.showScene("MainMenuScene");
        })();
      });


      //Pop up the table
      $('#playerResultsTable').css('display', 'table');


      //Pull the playersData from localStorage
      let playersData = retrieveData('players_data');

      playersData.sort((player1, player2)=>{

        // Sort by matchesWon in descending order
        if (player1.matchesWon > player2.matchesWon) return -1;
        if (player1.matchesWon < player2.matchesWon) return 1;

        // If matchesWon are the same, sort by goalDifference in descending order
        if (player1.goalDifference > player2.goalDifference) return -1;
        if (player1.goalDifference < player2.goalDifference) return 1;

        // If goalDifference is also the same, sort by goalsScored in descending order
        if (player1.goalsScored > player2.goalsScored) return -1;
        if (player1.goalsScored < player2.goalsScored) return 1;

        // If all three criteria are the same, no change in order
        return 0;

      });

      this.clearTable();                   //Clear HTML context before adding new set of rows 
      for(let playerData of playersData){
        this.appendTableRow(getImageSrcForPlayerType(playerData.avatar), playerData.name,
        playerData.matchesWon, playerData.matchesLost, playerData.matchesDrawn); 
      }

  
    }
  
    
  
    onExit() {
      // Clean up anything specific to the MenuScene when it becomes inactive
      this.backButton.remove();
      //Remove the table visibility
      $('#playerResultsTable').css('display', 'none');
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
          textFont(goal_font);
          textAlign(CENTER);
          text("RESULTS", 0, -HEIGHT/6);
          pop(); 
          }
      });

      this.layer_manager.displayLayers();

      
    }


    appendTableRow(imgSrc, playerName, matchesWon, matchesLost, matchesDrawn){
      // Get the table body element by its IDs
      const tableBody = select('#playersResultsTableBody');

      // Create a new table row element
      const row = document.createElement('tr');
      row.classList.add('row-class'); // Add your custom class here

      // Create table data cells for avatar, name, and button
      const avatarCell = document.createElement('td');
      avatarCell.classList.add('col-3'); // Add your custom class here

      const nameCell = document.createElement('td');
      nameCell.classList.add('col-3'); // Add your custom class here

      const matchesWonCell = document.createElement('td');
      matchesWonCell.classList.add('col-2'); // Add your custom class here

      const matchesLostCell = document.createElement('td');
      matchesLostCell.classList.add('col-2'); // Add your custom class here

      const matchesDrawnCell = document.createElement('td');
      matchesDrawnCell.classList.add('col-2'); // Add your custom class here


      // Create an image element for the avatar
      const avatarImage = createImg(imgSrc, "Avatar");
      avatarImage.size(18, 18);

      // Append elements to cells
      avatarCell.appendChild(avatarImage.elt);
      nameCell.innerHTML = playerName; // Set player name
      matchesWonCell.innerHTML = matchesWon; // Set matches won number
      matchesLostCell.innerHTML = matchesLost; // Set matches lost number
      matchesDrawnCell.innerHTML = matchesDrawn; // Set matches drawn number

      // Append cells to the row
      row.appendChild(avatarCell);
      row.appendChild(nameCell);
      row.appendChild(matchesWonCell);
      row.appendChild(matchesLostCell);
      row.appendChild(matchesDrawnCell);

      // Append the row to the table body
      tableBody.child(row);
    }

    clearTable() {
      // Get the table body element by its ID
      const tableBody = select('#playersResultsTableBody');
    
      // Remove all child elements (rows) from the table body
      tableBody.elt.innerHTML = '';
    }


  }