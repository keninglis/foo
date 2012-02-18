var kai = kai || {};
kai.zombies = kai.zombies || {};

kai.zombies.Normal = function(x,y,bearing) {

    this.x = x;
    this.y = y;
    this.r = 6;
    this.arcEnd = 2*Math.PI;
    this.speed = .5;
    this.bearing = bearing; 
};

kai.zombies.Normal.prototype.requestAction = function(){
    var dX = Math.cos(this.bearing) * this.speed;
    var dY = Math.sin(this.bearing) * this.speed;
    return { move: [this.x,this.y,dX,dY,this.radius] }; 
};

kai.zombies.Normal.prototype.act = function(response){
    if(!response) { return; }
    if(response.move) {
        this.x = response.move[0];
        this.y = response.move[1];
    }
};

kai.zombies.Normal.prototype.draw = function(ctx,offsetX,offsetY){
    ctx.beginPath(); 
    ctx.arc(this.x - offsetX,this.y - offsetY,this.r,0,this.arcEnd);
    ctx.fillStyle = 'red';
    ctx.fill();
}

