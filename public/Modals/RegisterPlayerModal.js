class RegisterPlayerModal {

    constructor() {
        // Create the modal container
        this.modal = createDiv();
        this.modal.class("modal");
  
        // Create the modal content
        this.modalContent = createDiv();
        this.modalContent.style("width", "500px"); // Set width to 400px
        this.modalContent.style("height", "500px"); // Set height to 400px
        this.modalContent.class("modal-content");
        this.modalContent.position(windowWidth / 4, -windowHeight / 2);

  
        // Create an image element and set its source
        let modalImage = createImg("soccer asseets/iceCube.png");
        modalImage.style("display", "block");
        modalImage.style("margin", "auto"); // Center the image
        modalImage.size(200, 200); // Set the size of the image
  
        // Create a label and a textbox for the player's name
        let nameLabel = createSpan("Insert name: ");
        nameLabel.style("font-weight", "bold");
        let nameInput = createInput();
        nameInput.size(200); // Set the size of the input field
  
        // Create left and right arrow buttons
        let leftArrow = createButton("←");
        let rightArrow = createButton("→");
        leftArrow.class("modal-button");
        rightArrow.class("modal-button");
  
        // Create "Register" and "Cancel" buttons
        let registerButton = createButton("Register");
        let cancelButton = createButton("Cancel");
        registerButton.class("modal-button");
        cancelButton.class("modal-button");
  
        // Add event listeners to the arrow buttons using arrow functions
        leftArrow.mousePressed(() => this.onLeftArrowClicked());
        rightArrow.mousePressed(() => this.onRightArrowClicked());
  
        // Add event listeners to the buttons using arrow functions
        registerButton.mousePressed(() => this.onRegisterClicked());
        cancelButton.mousePressed(() => this.onCancelClicked());
  
        // Add the elements to the modal content
        this.modalContent.child(modalImage); // Add the image element here
        this.modalContent.child(nameLabel);
        this.modalContent.child(nameInput);
        this.modalContent.child(leftArrow);
        this.modalContent.child(rightArrow);
        this.modalContent.child(registerButton);
        this.modalContent.child(cancelButton);
  
        // Add the modal content to the modal container

        this.modal.child(this.modalContent);

        $('#pauseModal').on('hidden.bs.modal', () => {
            this.hideModal(); 
        });

    }


    createCanvas(sketch) {
        
        sketch.setup = () => {
            let canvas = sketch.createCanvas(300, 150);
            canvas.parent(this.modalContent);  // Attach the canvas to the canvas div
            console.log("DA")
        };

        sketch.draw = () => {
            sketch.background(220);
            sketch.fill(0);
            sketch.rect(50, 50, 100, 100);
        };
    }

  
    showModal() {
        noLoop();
        this.modal.style("display", "block");
    }
  
    hideModal() {
        loop();
        this.modal.style("display", "none");
    }
  
    onLeftArrowClicked() {
        console.log("Left arrow clicked");
    }
  
    onRightArrowClicked() {
        console.log("Right arrow clicked");
    }
  
    onRegisterClicked() {
        console.log("Register button clicked");
        this.hideModal();
    }
  
    onCancelClicked() {
        console.log("Cancel button clicked");
        this.hideModal();
    }
}
