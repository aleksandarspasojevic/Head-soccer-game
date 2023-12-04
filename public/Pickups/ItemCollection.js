class ItemCollection {
    constructor(player, pos, startAngle = PI / 18, endAngle = 1.1 * PI / 2, angleOffset = PI/6) { //start and end angle of items being added
        this.player = player;
        this.pos = pos;
        this.itemCounts = new Map(); // HashMap to store the items and their counts
        this.radius = 100; // Radius of the central circle
        this.itemRadius = 20; // Radius of the circles representing items
        this.maxItems = 4;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.angleOffset = angleOffset;
        this.selectedItem = null;
    }

    collectItem(item) {
        item.player = this.player;                  //Item collected for this player
        
        if (this.itemCounts.has(item.name)) {
            this.itemCounts.get(item.name).count++; // Increment count of the existing item
        } else {
            this.itemCounts.set(item.name, { powerup: item, count: 1 }); // Add a new item to the map
        }
        // console.log("COLLECTED");
    }

    selectItem(index) {

        index -= 1;   //indexing items starting with index 1
        // Convert the itemCounts Map to an array
        const itemsArray = Array.from(this.itemCounts.values());
        
        if (index < 0 || index >= itemsArray.length) return;
        
        const itemData = itemsArray[index];
        //if the item has been already selected, then we can consume it
        // if(this.selectedItem == itemData){
        //     this.takeItem(itemData);
        // }
        // else this.selectedItem = itemData;

        this.takeItem(itemData);
        
    }

    takeItem(itemData){
        const powerup = itemData.powerup;
        if (itemData.count > 0) {
            if(!powerup.effect()) return;     //play the powerup

            itemData.count--; // Decrease the count of the selected item
            if (itemData.count === 0) {
                // Remove the item if count becomes 0
                this.itemCounts.delete(itemData.powerup.name);
            }
        }

    }
    

    update() {
        // Add any update logic for the items here
    }

    show() {
        layer_manager.addAsset(100, { 
            "draw": () => {
                push();
                // Display the central circle
                noStroke();
                fill(50); // Black fill color
                ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
                pop();
            }
        });

        // Display the items as circles around the central circle
        let itemCount = 0;
        this.itemCounts.forEach((itemData, itemName) => {
            if (itemCount >= this.maxItems) return; // Limit the number of displayed items
            const angle = map(itemCount, 0, this.maxItems, this.startAngle, this.endAngle);
            const x = this.pos.x + (this.radius + this.itemRadius / 2) * cos(angle);
            const y = this.pos.y + (this.radius + this.itemRadius / 2) * sin(angle);

            layer_manager.addAsset(101, { //debug colliders
                "draw": () => {
                    push();
                    noStroke();
                    if (itemData === this.selectedItem) // Use itemData directly, not this.itemData
                        fill(180);
                    else  
                        fill(150);
                    ellipse(x, y, this.itemRadius * 2, this.itemRadius * 2);

                    //angle offset of count value
                    let x2 = x + this.itemRadius * cos(this.angleOffset);
                    let y2 = y + this.itemRadius * sin(this.angleOffset);

                    fill(220);
                    ellipse(x2, y2, 15, 15);

                    stroke(90);
                    fill(90);
                    text(itemData.count, x2 - 3, y2 + 4);
                    pop();
                }
            }).addAsset(102, {
                'img': itemData.powerup.img,
                'img_pos': createVector(0, 0),
                'scale': 0.08,
                'pos': createVector(x, y),
                'rot': null
            });

            itemCount++;
        });

    }
}
