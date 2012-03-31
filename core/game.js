"use strict";
// I claim kai! Problem?
var kai = {};

// globals
kai.twoPI = Math.PI * 2;

kai.OBS_WALL = 1;
kai.OBS_DOOR = 2;
kai.OBS_LIFTDOOR = 3;
kai.OBS_SLIDEDOOR = 4;
kai.OBS_SHUTTER = 5;
kai.OBS_GLASS = 6;

kai.Game = function(board,player,startLevel) {
    // middle points of visible screen
    this.windowHalfW = board.actors.canvas.width / 2;
    this.windowHalfH = board.actors.canvas.height / 2;
    this.startLevel = startLevel;
    this.board = board;
    this.player = player;
    this.player.setWindow(this.windowHalfW, this.windowHalfH, board.actors);
    this.actors = startLevel.getActors();
    this.stageCorners = [];
};

// is actor on the visible stage (with a wee margin of 10 to handle partial zoms)
// @return boolean
kai.Game.prototype.onStage = function(actor){
    return (
        actor.x > this.stageCorners[0]-10 && actor.x < this.stageCorners[2]+10 &&
        actor.y > this.stageCorners[1]-10 && actor.y < this.stageCorners[3]+10
    );
};

kai.Game.prototype.loop = function(){
    // what ya doing? this happened. How d'ya like that?
    this.player.act(this.level.tryAction(this.player.requestAction()));
    for(var i in this.actors) {
        this.actors[i].act(this.level.tryAction(this.actors[i].requestAction()));
    }

    // if player has moved move background,etc 
    if(this.player.hasMoved) {

        // x,y,x2,y2 - corners of visible stage
        this.stageCorners = [
            this.player.x - this.windowHalfW, this.player.y - this.windowHalfH, 
            this.player.x + this.windowHalfW, this.player.y + this.windowHalfH 
        ];

        this.player.hasMoved = false;
        this.clearCtx(this.board.background);
        this.level.draw(this.board.background,this.stageCorners[0],this.stageCorners[1]);
        //console.debug(this.player.x,this.player.y);
    }
   
    // draw visible actors and player
    this.clearCtx(this.board.actors);
    for(var i in this.actors) {
        // only draw if they're in window
        if(this.onStage(this.actors[i])) {
            this.actors[i].draw(
                this.board.actors,this.stageCorners[0],this.stageCorners[1]
            );
            if(this.level.lineOfSight(this.player,this.actors[i])) {
                this.actors[i].doSeePlayer(this.player);
            } else {
                this.actors[i].doRelax();
            }
        }
    }
    this.player.draw(); 

    // setTimeout loses this unless we save it here 
    var that = this;
    setTimeout(function(){that.loop()}, 40);
};

kai.Game.prototype.start = function() {
    this.level = this.startLevel;
    var that = this;
    this.level.load(function(){ 
        that.player.x = that.level.startX;
        that.player.y = that.level.startY;
        that.loop(); 
    });
};


kai.Game.prototype.clearCtx = function(ctx) {
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
};
