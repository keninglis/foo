"use strict";

var kai = kai || {};

// constructor
kai.Player = function(input) {
    
    this.input = input;
    this.x = 100;
    this.y = 100;
    this.speed = 5;

    this.bearing = Math.PI;
    this.dBearing = 2 * Math.PI / 60; // @TODO magic number..how much do we turn

    this.radius = 6; //radius
    this.arcEnd = 2 * Math.PI; // full circle
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
    }
    if(this.input.isDown(this.input.RIGHT)) {
        this.bearing += this.dBearing;
    }

    if(this.input.isDown(this.input.UP)) {
        dX = -1 * Math.cos(this.bearing) * this.speed;
        dY = -1 * Math.sin(this.bearing) * this.speed;
        //console.debug('up');
    }
    if(this.input.isDown(this.input.DOWN)) {
        dY = Math.sin(this.bearing) * this.speed;
        dX = Math.cos(this.bearing) * this.speed;
        //console.debug('down');
    }
    if(dX || dY) {
        return { move: [this.x,this.y,dX,dY,this.radius] }; 
    }
};

// what happened to you this turn
kai.Player.prototype.act = function(response) {
    if(!response) { return; }
    if(response.move) {
        console.debug(this.bearing);
        this.x = response.move[0];
        this.y = response.move[1];
    }
};

kai.Player.prototype.draw = function() {
    
    this.ctx.beginPath(); 
    this.ctx.arc(this.winX,this.winY,this.radius,0,this.arcEnd);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
};
