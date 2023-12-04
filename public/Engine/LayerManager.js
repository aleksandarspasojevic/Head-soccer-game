
class LayerManager {
    constructor() {
      this.layers = {};
    }
  
    addAsset(layer, asset) {
      if (!this.layers[layer]) {
        this.layers[layer] = [];
      }
      this.layers[layer].push(asset);

      return this;
    }

    showAsset(img_asset){
        push()
        translate(img_asset?.pos)
        rotate(img_asset?.rot)
        if('img' in img_asset){
          if('transparency' in img_asset) tint(255, img_asset.transparency*255/100);
          if('invertX' in img_asset)                //If its true, then flip it over y axis
            if(img_asset.invertX) scale(-1, 1);
          
          image(img_asset.img, img_asset.img_pos.x, img_asset.img_pos.y, img_asset.img.width * img_asset.scale, img_asset.img.height * img_asset.scale);
        }
        else{
          scale(img_asset?.scale)
          img_asset?.draw()
        }
        pop()
    }
  
    displayLayers() {
        // Get the keys as an array
        const keys = Object.keys(this.layers);
    
        // Sort the keys numerically
        keys.sort((a, b) => parseInt(a) - parseInt(b));
    
        for (const layer of keys) {
            for (let i = 0; i < this.layers[layer].length; i++) {
                this.showAsset(this.layers[layer][i])
            }
        }
    
        this.layers = {};
    }
  
    
  }
  