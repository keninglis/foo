var kai = kai || {};

kai.levels = kai.levels || {};

// @param board { background, items, actors, $control }
kai.levels.awaken = function(board) {
    console.debug('awaken');

    var update = function() {};
    var draw = function() {};

    return {
        update:update,
        draw:draw
    };
}
