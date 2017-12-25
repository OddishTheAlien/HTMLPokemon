var rel_x = 4;
var rel_y = 0;
                                
var bergwald = new Sprite("ChipSet/bergwald.png", 16, 16, 30, 16);

function DrawBackgroundMap() {
    var mapIndex = 0;        
    for (var h = 0; h < 22; h++) {
        for (var w = 0; w < 22; w++, mapIndex++) {
            var tile_w = (w + rel_x) * 16;
            var tile_h = (h + rel_y) * 16;
            bergwald.draw(tile_w, tile_h, map[mapIndex]-1);
        }
    }
}