var kai = kai || {};

kai.levels = kai.levels || {};

kai.levels.Kaimall = function() {

}

kai.levels.Kaimall.prototype.load = function(){
    console.debug('loading from console');
}

kai.levels.Kaimall.prototype.tryAction = function(action) {
        //console.debug('kaimall tryAction');
};

kai.levels.Kaimall.prototype.getActors = function() {
    return [
        new kai.zombies.Normal(20,20,10), 
        new kai.zombies.Normal(180,180,10), 
        new kai.zombies.Normal(20,180,10), 
        new kai.zombies.Normal(180,20,10) 
    ];
}
