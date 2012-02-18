var kai = kai || {};

kai.levels = kai.levels || {};

kai.levels.Kaimall = function() {

}

kai.levels.Kaimall.prototype.load = function(){
    console.debug('Kai Mall loading...');
}

kai.levels.Kaimall.prototype.tryAction = function(action) {
    if(!action) { return; }
    if(action.move) {
        return { move: [action.move[0]+action.move[2], action.move[1]+action.move[3]] };
    }
};

kai.levels.Kaimall.prototype.getActors = function() {
    var actors = [];
    for(var i = 0; i < 50; i++) {
        actors.push(new kai.zombies.Normal(
            Math.random() * 200, Math.random() * 200, 2 * Math.PI * Math.random()
        ));
    }
    return actors;
}
