var kai = kai || {};

kai.levels = kai.levels || {};

kai.levels.Kaimall = function() {

}

kai.levels.Kaimall.prototype.load = function(){
    console.debug('loading from console');
}

kai.levels.Kaimall.prototype.tryAction = function(action) {
    if(!action) { return; }
    if(action.move) {
        return { move: [action.move[0]+action.move[2], action.move[1]+action.move[3]] };
    }
};

kai.levels.Kaimall.prototype.getActors = function() {
    return [
        new kai.zombies.Normal(20,20,0), 
        new kai.zombies.Normal(180,180,-1), 
        new kai.zombies.Normal(20,180,1), 
        new kai.zombies.Normal(180,20,-0) 

    ];
}
