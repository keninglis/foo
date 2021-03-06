"use strict";
// depends on kai

kai.Zombie = function(x,y,bearing) {

    this.x = x;
    this.y = y;
    this.radius = 6;
    this.baseSpeed = 1.4;
    this.speed = .4;
    this.bearing = bearing; 
    this.colour = '#333';

    this.testGrid = [
        [0,this.radius], [0,-this.radius],
        [0,this.radius/2], [0,-this.radius/2], 
        [this.radius,0], [-this.radius,0],
        [this.radius/2,0], [-this.radius/2,0]
    ];

    this.doRelax();
};

kai.Zombie.prototype.requestAction = function(){
    return { cmd:'forward', actor:this };
};



kai.Zombie.prototype.draw = function(ctx,offsetX,offsetY){
    ctx.beginPath(); 
    ctx.arc(this.x - offsetX,this.y - offsetY,this.radius,1+this.bearing,5+this.bearing);
    ctx.fillStyle = this.colour;
    ctx.fill();
}

// default mode... shamble and moan
kai.Zombie.prototype.doRelax = function(){
    if(this.mode === 'mhhh') { return; }
    this.mode = 'mhhh';
    this.speed = this.baseSpeed;
    this.colour = '#ccc';
    this.act = this.actMhhh;
};

// strategy: shamble aimlessly
kai.Zombie.prototype.actMhhh = function(response){
    if(response.bounce) {
        // silly random turn - staggering into corners
        this.bearing += Math.random() - .5;
    }
    if(response.move) {
        this.x = response.move[0];
        this.y = response.move[1];
    }
};

// brains sighted... chase and feed
// @param player
kai.Zombie.prototype.doSeePlayer = function(player){
    if(this.mode === 'braiiins') { return; }
    this.mode = 'braiiins';
    this.targetPlayer = player;
    this.speed = this.baseSpeed*2;
    this.colour = 'red';
    this.act = this.actBraiiins;
}

kai.Zombie.prototype.bearingToPlayer = function(player){
    return Math.atan2(player.y-this.y, player.x-this.x);
};

// strategy: chase and eat sweet, sweet brains
kai.Zombie.prototype.actBraiiins = function(response){
    if(response.bounce) {
        this.bearing += Math.random() - .5;// silly random turn - staggering into corners
        return;
    }
    if(response.move) {
        this.x = response.move[0];
        this.y = response.move[1];
    }
    // rotate to face player
    this.bearing = this.bearingToPlayer(this.targetPlayer);
    //this.bearing = Math.atan2(this.targetPlayer.y-this.y, this.targetPlayer.x-this.x);
};
