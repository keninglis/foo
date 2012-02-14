var kai = kai || {};
kai.zombies = kai.zombies || {};

kai.zombies.normal = function(x,y,bearing) {

    // what do you want to do this turn
    var requestAction = function(){
        //console.debug('zombie requestAction');
    };

    // what happened to you this turn
    var act = function(response) {
        //console.debug('zombie act');
    };

    return {
        requestAction: requestAction,
        act: act
    };

}
