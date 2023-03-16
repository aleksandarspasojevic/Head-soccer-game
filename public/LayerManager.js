
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
        if('img' in img_asset)
          image(img_asset.img, img_asset.img_pos.x, img_asset.img_pos.y, img_asset.img.width * img_asset.scale, img_asset.img.height * img_asset.scale);
        else{
          scale(img_asset?.scale)
          img_asset?.draw()
        }
        pop()
    }
  
    displayLayers() {
      // Get the keys as an array
      const keys = Object.keys(this.layers);

      // Sort the keys --> sort the layers 
      keys.sort((a, b) => a.localeCompare(b));

      for (const layer of keys) {
        for (let i = 0; i < this.layers[layer].length; i++) {
            this.showAsset(this.layers[layer][i])
        }
      }
      
      this.layers = {};
    }
  }
  