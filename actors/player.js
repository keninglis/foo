var kai = kai || {};

kai.player = function(input) {

    // what do you want to do this turn
    var requestAction = function(){
        //console.debug('player requestAction');
    };

    // what happened to you this turn
    var act = function(response) {
        //console.debug('player act');
    };

    var draw = function(ctx) { 

    };

    return {
        requestAction: requestAction,
        act: act,
        draw: draw
    };
}
