function GameManager(){
    this.grid = new Grid();
    this.ui = new UI();
    this.isRotating = false;
    this.startTiming = null;
    this.isAutoplaying = false;
    this.autoplaySequence = new Array();
    this.isStarted = false;

    this.ui.onOverlayPressed = this.start.bind(this);
    this.ui.onRotatePressed = this.move.bind(this);
    this.ui.onResetClicked = function(){
        this.reset();
        this.ui.renderOverlay();
    }.bind(this);
    this.ui.onAutoplayClicked = function(){
        this.autoplay();
    }.bind(this);
    
    this.reset();
    this.ui.renderOverlay();
};

GameManager.prototype.reset = function(){
    this.grid = new Grid();
    this.ui.render(this.grid);
    this.isAutoplaying = false;
    this.autoplaySequence = new Array();
    this.isStarted = false;
};

GameManager.prototype.start = function(){
    this.ui.overlayVisible = false;
    this.grid.randomize();
    this.ui.render(this.grid);
    this.startTiming = Date.now();
    this.isStarted = true;
};

GameManager.prototype.move = function(position){
    if (this.isRotating || this.isAutoplaying){
        return;
    }

    var animation = new GridRotationAnimation(this.ui, this.grid, position);
    animation.onCompleted = (function(){
        this.isRotating = false;
        if (this.grid.isComplete()){
            this.isStarted = false;
            var timing = Date.now() - this.startTiming;
            this.ui.renderWinOverlay(timing / 1000);
        }
    }).bind(this);
    this.isRotating = true;
    animation.start();
    this.grid.move(position);
};

GameManager.prototype.autoplay = function(){
    if (this.isAutoplaying || !this.isStarted)
        return;
    this.isAutoplaying = true;
    this.aiMove();  
};

GameManager.prototype.aiMove = function(){
    if (this.grid.isComplete()){
        this.isStarted = false;
        this.isAutoplaying = false;
        var timing = Date.now() - this.startTiming;
        this.ui.renderWinOverlay(timing / 1000);
        return;
    }
    
            
    if (this.autoplaySequence.length == 0){
        var sequence = AI.computeSequence(this.grid);
        if (sequence.length === undefined){
            this.autoplaySequence.push(sequence);
        }else{
            for(var i = 0; i < sequence.length; i++){
                this.autoplaySequence.push(sequence[i]);
            }
        }
    }
    
    var position = this.autoplaySequence.shift();
    var animation = new GridRotationAnimation(this.ui, this.grid, position);
    animation.onCompleted = (function(){
        this.isRotating = false;
        this.aiMove();
    }).bind(this);
    this.isRotating = true;
    animation.start();
    this.grid.move(position);
};
