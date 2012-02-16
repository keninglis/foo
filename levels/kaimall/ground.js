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
            new kai.zombies.Normal(20,20,10), 
            new kai.zombies.Normal(180,180,10), 
            new kai.zombies.Normal(20,180,10), 
            new kai.zombies.Normal(180,20,10) 
        ];
    }

    return {
        tryAction: tryAction,
        getActors: getActors
    }

}
