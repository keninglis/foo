var kai = kai || {};
kai.zombies = kai.zombies || {};

kai.zombies.Normal = function(x,y,bearing) {

    this.x = x;
    this.y = y;
    this.r = 6;
    this.arcEnd = 2*Math.PI;
    this.bearing = bearing; 
};

kai.zombies.Normal.prototype.requestAction = function(){
};

kai.zombies.Normal.prototype.act = function(){
};

kai.zombies.Normal.prototype.draw = function(ctx,offsetX,offsetY){
    ctx.beginPath(); 
    ctx.arc(this.x - offsetX,this.y - offsetY,this.r,0,this.arcEnd);
    ctx.fillStyle = 'red';
    ctx.fill();
}

