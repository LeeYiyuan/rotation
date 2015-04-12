function UI(){
    this.canvas = document.getElementById('grid-canvas');
    this.resetButton = document.getElementById('reset-button');
    this.autoplayButton = document.getElementById('autoplay-button');
    this.tileRadius = 30;
    this.tileSpacing = 60;
    this.tileRotationRadius = Math.sqrt(Math.pow(this.tileSpacing + 2 * this.tileRadius, 2) / 2); // Pythagoras theorem
    this.overlayVisible = false;


    this.onRotatePressed = null;
    this.onOverlayPressed = null;
    this.onResetClicked = null;
    this.onAutoplayClicked = null;

    this.canvas.addEventListener('mousedown', this.onCanvasClick.bind(this), false);
    this.resetButton.addEventListener('click', function(){
        if (this.onResetClicked != null){
            this.onResetClicked();
        }
    }.bind(this), false);
    this.autoplayButton.addEventListener('click', function(){
        if (this.onAutoplayClicked != null){
            this.onAutoplayClicked();
        }
    }.bind(this), false);
};

UI.prototype.renderOverlay = function(){
    this.overlayVisible = true;
    var context = this.canvas.getContext('2d');
    context.fillStyle = "rgba(255, 255, 255, 0.9)";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var text = "Click to start!";

    context.font="40px Verdana";
    context.fillStyle = "#000000";
    var width = context.measureText(text).width;

    context.fillText(text, (this.canvas.width - width) / 2, (this.canvas.height + 28) / 2);
};

UI.prototype.renderWinOverlay = function(timing){
    this.overlayVisible = true;
    var context = this.canvas.getContext('2d');
    context.fillStyle = "rgba(255, 255, 255, 0.9)";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);


    context.font="40px Verdana";
    context.fillStyle = "#000000";
    var text1 = "You win!";
    var width1 = context.measureText(text1).width;
    context.fillText(text1, (this.canvas.width - width1) / 2, 130);

    var text2 = (Math.round( timing * 10 ) / 10).toFixed(1) + " s";
    var width2 = context.measureText(text2).width;
    context.fillText(text2, (this.canvas.width - width2) / 2, 200);

    context.font="20px Verdana";
    var text3 = "Click to play again"
    var width3 = context.measureText(text3).width;
    context.fillText(text3, (this.canvas.width - width3) / 2, 260);
};

UI.prototype.render = function(grid, xOffsets, yOffsets){
    var xOffset = (this.canvas.width - 2 * this.tileSpacing - 3 * 2 * this.tileRadius) / 2;
    var yOffset = (this.canvas.height - 2 * this.tileSpacing - 3 * 2 * this.tileRadius) / 2;
    var context = this.canvas.getContext('2d');
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height); // Because clearRect is buggy on Android

    // Rotate buttons
    for(var r = 0; r < 2; r++){
        for(var c = 0; c < 2; c++){
            context.beginPath();
            context.lineWidth = 3;
            context.strokeStyle = '#00FFFF';
            context.arc(xOffset + 2 * this.tileRadius + this.tileSpacing / 2 + c * (this.tileSpacing + 2 * this.tileRadius),
                    yOffset + 2 * this.tileRadius + this.tileSpacing / 2 + r * (this.tileSpacing + 2 * this.tileRadius),
                this.tileRadius,
                0,
                    2 * Math.PI);
            context.stroke();
        }
    }

    // Tiles
    for(var r = 0; r < 3; r++){
        for(var c = 0; c < 3; c++){
            var value = grid.tiles[r][c];
            var text = (grid.tiles[r][c] + 1).toString();

            // Clear background
            context.beginPath();
            context.fillStyle = "#FFFFFF";
            context.beginPath();
            context.arc(xOffset + this.tileRadius + c * (this.tileSpacing + 2 * this.tileRadius) + (xOffsets == null ? 0 : xOffsets[r][c]),
                    yOffset + this.tileRadius + r * (this.tileSpacing + 2 * this.tileRadius) - (yOffsets == null ? 0 : yOffsets[r][c]),
                this.tileRadius,
                0,
                    2 * Math.PI);
            context.fill();

            // Draw text
            context.font="40px Verdana";
            context.fillStyle = value < 3 ? "#FF0000" : value < 6 ? "#00FF00" : "#0000FF";
            context.fillText(
                    text,
                    xOffset + this.tileRadius + c * (this.tileSpacing + 2 * this.tileRadius) + (xOffsets == null ? 0 : xOffsets[r][c]) - context.measureText(text).width / 2,
                    yOffset + this.tileRadius + r * (this.tileSpacing + 2 * this.tileRadius) - (yOffsets == null ? 0 : yOffsets[r][c]) + 28 / 2);

            // Draw outline circle
            context.lineWidth=1;
            context.strokeStyle = '#000000';
            context.beginPath();
            context.arc(xOffset + this.tileRadius + c * (this.tileSpacing + 2 * this.tileRadius) + (xOffsets == null ? 0 : xOffsets[r][c]),
                    yOffset + this.tileRadius + r * (this.tileSpacing + 2 * this.tileRadius) - (yOffsets == null ? 0 : yOffsets[r][c]),
                this.tileRadius,
                0,
                    2 * Math.PI);

            context.stroke();
        }
    }
};

UI.prototype.onCanvasClick = function(e){
    if (this.overlayVisible){
        if (this.onOverlayPressed != null){
            this.onOverlayPressed();
            return;
        }
    }

    var x = 0;
    var y = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) 	{
        x = e.pageX;
        y = e.pageY;
    }
    else if (e.clientX || e.clientY) 	{
        x = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }

    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;

    x *= this.canvas.width / this.canvas.clientWidth;
    y *= this.canvas.height / this.canvas.clientHeight;

    var centers = [
        {x: 130, y:130},
        {x: 250, y: 130},
        {x: 130, y: 250},
        {x: 250, y: 250}
    ];

    var position = -1;

    for(var i = 0; i < 4; i++){
        if (Math.pow(centers[i].x - x, 2) + Math.pow(centers[i].y - y, 2) <= Math.pow(30, 2)){
            position = i;
            break;
        }
    }

    if (position > -1){
        this.onRotatePressed(position);
    }

    event.preventDefault();
    return false;
};
