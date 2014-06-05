function Grid(){
    this.tiles = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
};

Grid.prototype.clone = function(){
    var grid = new Grid();
    for(var r = 0; r < 3; r++){
        for(var c = 0; c < 3; c++){
            grid.tiles[r][c] = this.tiles[r][c];
        }
    }
    return grid;
};

Grid.prototype.move = function (position){
    var r = position >> 1;
    var c = position & 1;

    var temp = this.tiles[r][c];
    this.tiles[r][c] = this.tiles[r + 1][c];
    this.tiles[r + 1][c] = this.tiles[r + 1][c + 1];
    this.tiles[r + 1][c + 1] = this.tiles[r][c + 1];
    this.tiles[r][c + 1] = temp;
};

Grid.prototype.isEasyGrid = function(){
    for(var r = 0; r < 3; r++){
        var count = 0;
        for(var c = 0; c < 3; c++){
            if (this.tiles[r][c] >= 3 * r && this.tiles[r][c] < 3 * (r + 1)){
                count++;
                if (count > 1){
                    return true;
                }
            }
        }
    }
    return false;
};

Grid.prototype.randomize = function(){
    while(this.isEasyGrid()){
        for(var i = 0; i < 100; i++) {
            this.move(Math.floor((Math.random() * 4)));
        }
    }
};

Grid.prototype.isComplete = function(){
    for(var r = 0; r < 3; r++){
        for(var c = 0; c < 3; c++){
            if (this.tiles[r][c] != r * 3 + c){
                return false;
            }
        }
    }
    return true;
};
