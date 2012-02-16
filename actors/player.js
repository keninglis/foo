var kai = kai || {};

// constructor
kai.Player = function(input) {
    
    this.input = input;
    this.x = 20;
    this.y = 20;
    this.bearing = 0;
    this.r = 6; //radius
    this.arcEnd = 2 * Math.PI; // full circle
}

kai.Player.prototype.setWindow = function(midX,midY,ctx) {
    // adjust midX by radius?
    this.winX = midX;
    this.winY = midX;
    this.ctx = ctx;
};

// what do you want to do this turn
kai.Player.prototype.requestAction = function(){
    if(this.input.isDown(this.input.UP)) {
        console.debug('up');
    }
    if(this.input.isDown(this.input.DOWN)) {
        console.debug('down');
    }
    if(this.input.isDown(this.input.LEFT)) {
        console.debug('left');
    }
    if(this.input.isDown(this.input.RIGHT)) {
        console.debug('right');
    }
    //console.debug('player requestAction');
};

// what happened to you this turn
kai.Player.prototype.act = function(response) {
    //console.debug('player act');
};

kai.Player.prototype.draw = function() {
    this.ctx.beginPath(); 
    this.ctx.arc(this.winX,this.winY,this.r,0,this.arcEnd);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
};
