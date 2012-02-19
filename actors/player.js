"use strict";

var kai = kai || {};

// constructor
kai.Player = function(input) {
    
    this.input = input;
    this.x = 100;
    this.y = 100;
    this.speed = 5;

    this.twoPI = 2 * Math.PI;
    this.bearing = 0; 
    this.dBearing = this.twoPI / 60; // @TODO magic number..how much do we turn

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
        if(this.bearing < 0) { this.bearing += this.twoPI; } 
    }
    if(this.input.isDown(this.input.RIGHT)) {
        this.bearing += this.dBearing;
        if(this.bearing > this.twoPI) { this.bearing -= this.twoPI; }
    }

    if(this.input.isDown(this.input.UP)) {
        dX = Math.cos(this.bearing) * this.speed;
        dY = Math.sin(this.bearing) * this.speed;
        //console.debug('up');
    }
    if(this.input.isDown(this.input.DOWN)) {
        dY = -1 * Math.sin(this.bearing) * this.speed;
        dX = -1 * Math.cos(this.bearing) * this.speed;
        //console.debug('down');
    }
    if(dX || dY) {
        return { 
            player: 1, // identify me
            move: [this.x,this.y,dX,dY,this.radius] 
        }; 
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
