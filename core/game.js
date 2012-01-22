var kai = kai || {};

kai.game = function(startLevel) {
    console.debug('game');
    var level = startLevel;
    var start = function() {
        console.debug('start');
    };
    return {
        start:start
    }
}
