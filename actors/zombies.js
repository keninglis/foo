"use strict";
// depends on kai

kai.zombies = kai.zombies || {};

kai.zombies.Normal = function(x,y,bearing) {

    this.x = x;
    this.y = y;
    this.radius = 6;
    this.speed = .5;
    this.bearing = bearing; 
};

kai.zombies.Normal.prototype.requestAction = function(){
    return { cmd:'forward', actor:this };
};

kai.zombies.Normal.prototype.act = function(response){
    if(!response) { return; }
    if(response.bounce) {
        this.bearing += Math.random() - .5;// silly random turn - staggering into corners
    }
    if(response.move) {
        this.x = response.move[0];
        this.y = response.move[1];
    }
};

kai.zombies.Normal.prototype.draw = function(ctx,offsetX,offsetY){
    ctx.beginPath(); 
    ctx.arc(this.x - offsetX,this.y - offsetY,this.radius,1+this.bearing,5+this.bearing);
    ctx.fillStyle = 'red';
    ctx.fill();
}
