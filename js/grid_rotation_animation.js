function GridRotationAnimation(ui, grid, position){
    this.ui = ui;
    this.grid = grid.clone();
    this.r = position >> 1;
    this.c = position & 1;
    this.onCompleted = null;

    this.animation = new Animation(150);
    this.animation.onUpdate = this.animationUpdate.bind(this);
    var self = this;
    this.animation.onCompleted = function(){
        if (self.onCompleted != null){
            self.onCompleted();
        }
    };
};

GridRotationAnimation.prototype.animationUpdate = function(progress){
    var angle = progress * Math.PI / 2;

    var xOffsets = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    var yOffsets = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    var rotationXOffsets = Rotation.rotationXOffsets(angle);
    var rotationYOffsets = Rotation.rotationYOffsets(angle);

    for(var r = 0; r < 2; r++){
        for(var c = 0; c < 2; c++){
            xOffsets[r + this.r][c + this.c] = this.ui.tileRotationRadius * rotationXOffsets[r][c];
            yOffsets[r + this.r][c + this.c] = this.ui.tileRotationRadius * rotationYOffsets[r][c];
        }
    }

    this.ui.render(this.grid, xOffsets, yOffsets);
};

GridRotationAnimation.prototype.start = function(){
  this.animation.start();
};