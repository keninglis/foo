var kai = kai || {};

kai.game = function(board,player,startLevel) {
    var actors;
    var level;

    // middle points of visible screen
    var windowHalfW = board.actors.canvas.width / 2;
    var windowHalfH = board.actors.canvas.height / 2;
    
    var changeLevel = function(newLevel) {
        level = newLevel;
        // @TODO add actors from level
        actors = level.getActors();
        player.setWindow(windowHalfW, windowHalfH, board.actors);
        // @TODO place player on new level        
    };
    changeLevel(startLevel); // initial level

    var start = function() {
        loop();
    };

    var turn = 0;
    var loop = function(){
        turn++;
        if(!(turn % 50)) { console.debug('turn',turn); }

        // what ya doing? this happened. How d'ya like that?
        player.act(level.tryAction(player.requestAction()));
        for(var i in actors) {
            actors[i].act(level.tryAction(actors[i].requestAction()));
        }
       
        player.draw(); 


        setTimeout(loop, 200);
    };
    

    return {
        start:start
    };
}
