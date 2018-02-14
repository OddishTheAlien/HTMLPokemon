/**
* Define a map
* @param a background panorama
* @param a spritesheet with the tiles for the map
* @param the maps number of tiles in x direction
* @param the maps number of tiles in y direction
* @param the width of a single tile on the spritesheet
* @param the height of a single tile on the spritesheet
* @param the spritesheets number of tiles in x direction
* @param the spritesheets number of tiles in y direction
*/
function map(image, tileset, mapWidth, mapHeight, tileWidth, tileHeight, tilesX, tilesY) {
    
    // Panorama Image
    if (image != undefined) {
        this.image = new Image();
        this.image.src = image;
        // Panorama Properties
        this.x = 0;
        this.y = 0;    
        this.speedX = 0;
        this.speedY = 0;
    } 
    
    // Tileset Image
    this.tileset = new Image();
    this.tileset.src = tileset;    
    
    // Map Properties
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tilesX = tilesX;
    this.tilesY = tilesY;
    
    // Pixel width & height
    this.width = this.mapWidth * this.tileWidth;
    this.height = this.mapHeight * this.tileHeight;
    
    // Map Layers
    this.layers = [[],[],[]];
    this.layerC = [];
    
    /**
    * Initalizes Panorama, Background and Foreground
    * After changing a map call drawCache() to draw the map on the cached canvas
    */
    this.init = function() {        
        // Create a components that represents each tile on the map
        var mapIndex = 0;
        var tile_w, tile_h;
        for (var h = 0; h < this.mapHeight; h++) {
            for (var w = 0; w < this.mapWidth; w++, mapIndex++) {
                // Components position
                tile_w = w * this.tileWidth;
                tile_h = h * this.tileHeight;
                for (var i = 0; i < this.layers.length; i++) {
                    this.layers[i][mapIndex] = new component(tile_w, tile_h).sprite(tileset, this.tileWidth, this.tileHeight, this.tilesX, this.tilesY);
                    this.layers[i][mapIndex].static = true;
                }
            }
        }
    }
    
    /**
    * Load layers into the the map
    * @param layer1 (background)
    * @param layer2 (background)
    * @param layer3 (foreground)
    * @param collision layer
    */
    this.loadLayers = function(l1, l2, l3, lc) {        
        var mapIndex = 0;
        for (var h = 0; h < this.mapHeight; h++) {
            for (var w = 0; w < this.mapWidth; w++, mapIndex++) {
                // Layer 1: Background 1
                this.layers[0][mapIndex].sequence = l1[mapIndex]-1;
                // Layer 2: Background 2
                this.layers[1][mapIndex].sequence = l2[mapIndex]-1;
                // Layer 3: Foreground
                this.layers[2][mapIndex].sequence = l3[mapIndex]-1;
            }
        }
        // Collision Layer
        this.layerC = lc;
    }
    
    /**
    * If the cached images need to be updated
    */
    this.drawCache = function() {
        // Adjust the cache canvas' size
        myGameArea.panorama.width = myGameArea.canvas.width;
        myGameArea.panorama.height = myGameArea.canvas.height;
        
        myGameArea.background.width = this.width;
        myGameArea.background.height = this.height;
    
        myGameArea.foreground.width = this.width;
        myGameArea.foreground.height = this.height;
        
        // Clear the canvas' ...
        myGameArea.context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
        myGameArea.cgx1.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
        myGameArea.cgx2.clearRect(0, 0, myGameArea.background.width, myGameArea.background.height);
        myGameArea.cgx3.clearRect(0, 0, myGameArea.foreground.width, myGameArea.foreground.height);
        
        // ...  and repaint!
        if (this.image != undefined) myGameArea.cgx1.drawImage(this.image, this.x, this.y, myGameArea.panorama.width, myGameArea.panorama.height);
        // Assume all layers have the same size!
        for (var i = 0; i < this.layers[0].length; i++) {
            this.layers[0][i].draw(myGameArea.cgx2);
            this.layers[1][i].draw(myGameArea.cgx2);
            this.layers[2][i].draw(myGameArea.cgx3);
        }
    }
    
    // ####################################
    //  Draw functions for the game canvas
    // ####################################
           
    /**
    * Draws the Panorama & the background of the map
    */
    this.drawBackground = function() {
        ctx = myGameArea.context;
        ctx.drawImage(myGameArea.panorama, 0, 0);
        ctx.drawImage(myGameArea.background, -gameCamera.x, -gameCamera.y);
        /*
        // To Draw animated tiles: sequence has to be an array and you have to set the components animationTime (i.e = 20)
        for (var i = 0; i < this.layer1.length; i++) {
            if (this.layers[0][i] != undefined) {
                if (this.layers[0][i].sequence != undefined)
                    if (this.layers[0][i].sequence.length != undefined)
                        this.layers[0][i].draw(ctx);            
            }
        }*/
    }
    
    /**
    * Draws the foreground of the map
    */
    this.drawForeground = function() {
        ctx = myGameArea.context;
        ctx.drawImage(myGameArea.foreground, -gameCamera.x, -gameCamera.y);
    }      
}