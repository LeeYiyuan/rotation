function Animation(duration){
    this.animationProgress = 0;
    this.lastUpdate = null;
    this.animationDuration = duration;

    this.onUpdate = null;
    this.onCompleted = null;
};

Animation.prototype.update = function(timestamp){
    if (this.lastUpdate == null){
        this.lastUpdate = timestamp;
    }

    var self = this;
    var delta = timestamp - this.lastUpdate;
    this.lastUpdate = timestamp;

    this.animationProgress += delta / this.animationDuration;
    if (this.animationProgress >= 1){
        this.animationProgress = 1;
        if (this.onUpdate != null){
            this.onUpdate(this.animationProgress);
        }
        if (this.onCompleted != null){
            this.onCompleted();
        }
    }else{
        if (this.onUpdate != null){
            this.onUpdate(this.animationProgress);
        }
        window.requestAnimFrame(function(){
            self.update(Date.now());
        });
    }
};

Animation.prototype.start = function(){
    var self = this;

    window.requestAnimFrame(function(){
        self.update(Date.now());
    });
};