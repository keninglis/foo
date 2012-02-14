var kai = kai || {};

kai.game = function(board,player,startLevel) {
    var actors;
    var level;
    
    var changeLevel = function(newLevel) {
        level = newLevel;
        // @TODO add actors from level
        actors = level.getActors();
        // @TODO place player on new level        
        actors.push(player);
    };
    changeLevel(startLevel); // initial level

    var start = function() {
        loop();
    };

    var turn = 0;
    var loop = function(){
        if(!(turn % 50)) { console.debug('turn',turn); }
            
        turn++;
        // ask actors what they're doing, carry out the response from the level
        for(var i in actors) {
            var response = level.tryAction(actors[i].requestAction());
            // opportunity to delay response till end of loop
            actors[i].act(response);    
        }
        setTimeout(loop, 200);
    };
    

    return {
        start:start
    };
}
