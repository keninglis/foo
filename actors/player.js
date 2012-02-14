var kai = kai || {};

kai.player = function(input) {

    // what do you want to do this turn
    var requestAction = function(){
        if(input.isDown(input.UP)) {
            console.debug('up');
        }
        if(input.isDown(input.DOWN)) {
            console.debug('down');
        }
        if(input.isDown(input.LEFT)) {
            console.debug('left');
        }
        if(input.isDown(input.RIGHT)) {
            console.debug('right');
        }
        //console.debug('player requestAction');
    };

    // what happened to you this turn
    var act = function(response) {
        //console.debug('player act');
    };

    return {
        requestAction: requestAction,
        act: act
    };
}
