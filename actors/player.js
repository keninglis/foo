"use strict";
// depends on kai

// constructor
kai.Player = function(input) {
    
    this.input = input;
    this.x = 100;
    this.y = 100;
    this.speed = 5;

    this.bearing = 0; 
    
    this.dBearing = kai.twoPI / 60; // @TODO magic number..how much do we turn

    this.radius = 6; //radius

    this.hasMoved = true; // start as true to start drawing
};

kai.Player.prototype.setWindow = function(midX,midY,ctx) {
    // adjust midX by radius?
    this.winX = midX; 
    this.winY = midX;
    this.ctx = ctx;
};

// what do you want to do this turn
kai.Player.prototype.requestAction = function(){

    var dX = 0,dY = 0; 

    if(this.input.isDown(this.input.LEFT)) {
        this.bearing -= this.dBearing;
        if(this.bearing < 0) { this.bearing += kai.twoPI; } 
    }
    if(this.input.isDown(this.input.RIGHT)) {
        this.bearing += this.dBearing;
        if(this.bearing > kai.twoPI) { this.bearing -= kai.twoPI; }
    }

    if(this.input.isDown(this.input.UP)) {
        return { actor:this, cmd:'forward' };
    }
    if(this.input.isDown(this.input.DOWN)) {
        return { actor:this, cmd:'backward' };
    }
};

// what happened to you this turn
kai.Player.prototype.act = function(response) {
    if(!response) { return; }
    if(response.move) {
        this.x = response.move[0];
        this.y = response.move[1];
        this.hasMoved = true;
    }
};

kai.Player.prototype.draw = function() {
    this.ctx.beginPath(); 
    // crude player - flat is front 
    this.ctx.arc(this.winX,this.winY,this.radius,1+this.bearing,5+this.bearing);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
};
