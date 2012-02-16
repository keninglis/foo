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
            new kai.zombies.Normal(10,10,10), 
            new kai.zombies.Normal(15,10,10), 
            new kai.zombies.Normal(10,15,10) 
        ];
    }

    return {
        tryAction: tryAction,
        getActors: getActors
    }

}
