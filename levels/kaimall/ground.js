var kai = kai || {};

kai.levels = kai.levels || {};

kai.levels.kaimall = function() {

    // respond to an action from an actor
    var tryAction = function(action) {
        //console.debug('kaimall tryAction');
    };

    // get initial cast
    var getActors = function() {
        return [
            kai.zombies.normal(10,10,10), 
            kai.zombies.normal(15,10,10), 
            kai.zombies.normal(10,15,10) 
        ];
    }

    return {
        tryAction: tryAction,
        getActors: getActors
    }

}
