"use strict";
// depends on kai

kai.Zombie = function(x,y,bearing) {

    this.x = x;
    this.y = y;
    this.radius = 6;
    this.speed = .4;
    this.bearing = bearing; 

    this.testGrid = [
        [0,this.radius], [0,-this.radius],
        [0,this.radius/2], [0,-this.radius/2], 
        [this.radius,0], [-this.radius,0],
        [this.radius/2,0], [-this.radius/2,0]
    ];
};

kai.Zombie.prototype.requestAction = function(){
    return { cmd:'forward', actor:this };
};

kai.Zombie.prototype.act = function(response){
    if(!response) { return; }
    if(response.bounce) {
        this.bearing += Math.random() - .5;// silly random turn - staggering into corners
    }
    if(response.move) {
        this.x = response.move[0];
        this.y = response.move[1];
    }
};

kai.Zombie.prototype.draw = function(ctx,offsetX,offsetY){
    ctx.beginPath(); 
    ctx.arc(this.x - offsetX,this.y - offsetY,this.radius,1+this.bearing,5+this.bearing);
    ctx.fillStyle = 'red';
    ctx.fill();
}
