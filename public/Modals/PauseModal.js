class PauseModal {

    constructor() {
      //Modal container button handlers

      $('#mainMenuButton').click(() => {
        (async () => {
          await sceneManager.showScene("MainMenuScene");
        })();
        this.hideModal(); 
      });

      $('#replayButton').click(() => {  
        (async () => {
          let activeScene = sceneManager.activeScene;

          const replayMatchData = {
            'player1Data': activeScene.player1Data,
            'player2Data': activeScene.player2Data,
            'selectedTerrainName': activeScene.selectedTerrainName
          }
          

          await sceneManager.showScene("GameScene1", replayMatchData);
        })();  
        this.hideModal(); 
      });
    
      $('#continueButton').click(() => {
        this.hideModal(); 
      });

      $('#closeButton').click(() => {
        this.hideModal(); 
      });

      $('#pauseModal').on('hidden.bs.modal', () => {
        this.hideModal(); 
      });
    

    }
  
    showModal() {
      noLoop();

      $('#pauseModal').modal('show');
    }
  
    hideModal() {
      loop();

      $('#pauseModal').modal('hide'); // Hide the modal
    }

  }
  