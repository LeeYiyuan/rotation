function GameManager(){
    this.grid = new Grid();
    this.ui = new UI();
    this.isRotating = false;
    this.startTiming = null;

    this.ui.onOverlayPressed = this.start.bind(this);
    this.ui.onRotatePressed = this.move.bind(this);
    this.ui.onResetClicked = function(){
        this.reset();
        this.ui.renderOverlay();
    }.bind(this);

    this.reset();
    this.ui.renderOverlay();
};

GameManager.prototype.reset = function(){
    this.grid = new Grid();
    this.ui.render(this.grid);
};

GameManager.prototype.start = function(){
    this.ui.overlayVisible = false;
    this.grid.randomize();
    this.ui.render(this.grid);
    this.startTiming = Date.now();
};

GameManager.prototype.move = function(position){
    if (this.isRotating){
        return;
    }

    var animation = new GridRotationAnimation(this.ui, this.grid, position);
    animation.onCompleted = (function(){
        this.isRotating = false;
        if (this.grid.isComplete()){
            var timing = Date.now() - this.startTiming;
            this.ui.renderWinOverlay(timing / 1000);
        }
    }).bind(this);
    this.isRotating = true;
    animation.start();
    this.grid.move(position);
};