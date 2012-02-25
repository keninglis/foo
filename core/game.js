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
}

kai.Game.prototype.loop = function(){
    // what ya doing? this happened. How d'ya like that?
    this.player.act(this.level.tryAction(this.player.requestAction()));
    for(var i in this.actors) {
        this.actors[i].act(this.level.tryAction(this.actors[i].requestAction()));
    }

    // where the window is in abs x,y
    var offsetX = this.player.x - this.windowHalfW; 
    var offsetY = this.player.y - this.windowHalfH; 
  
    // if player has moved move background,etc 
    if(this.player.hasMoved) {
        this.player.hasMoved = false;
        this.clearCtx(this.board.background);
        this.level.draw(this.board.background,offsetX,offsetY);
        //console.debug(this.player.x,this.player.y);
    }
    
    // move actors anyway
    // @todo clear actors 

    this.clearCtx(this.board.actors);
    //console.debug('at', this.player.x, this.player.y);
    for(var i in this.actors) {
        this.actors[i].draw(this.board.actors,offsetX,offsetY);
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
