var kai = kai || {};
kai.zombies = kai.zombies || {};

kai.zombies.Normal = function(x,y,bearing) {

    this.x = x;
    this.y = y;
    this.bearing = bearing; 
};

kai.zombies.Normal.prototype.requestAction = function(){
};

kai.zombies.Normal.prototype.act = function(){
};
