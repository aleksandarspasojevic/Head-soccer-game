class PlayerNameConflictModal {

    constructor() {
      //Modal container button handlers

      $('#pauseModal').on('hidden.bs.modal', () => {
        this.hideModal(); 
      });

    }
  
    showModal() {
      $('#playerNameConflictModal').modal('show');
    }
  
    hideModal() {
      $('#playerNameConflictModal').modal('hide'); // Hide the modal
    }
  
  }
  