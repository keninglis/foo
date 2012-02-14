var kai = kai || {};

kai.game = function(board) {

    var start = function() {
        console.debug('starting');
        loop();
    };

    // http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
    var key = {
        pressed:{},
        LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,  // arrows
        // LEFT: 65, UP: 87, RIGHT: 68, DOWN: 83,    // WSAD
        isDown: function(code) { return this.pressed[code]; },
        onKeydown: function(e) { this.pressed[e.keyCode] = true; },
        onKeyup: function(e) { delete this.pressed[e.keyCode]; }
    };
    window.addEventListener('keyup', function(e) { key.onKeyup(e); }, false);
    window.addEventListener('keydown', function(e) { key.onKeydown(e); }, false);

    var turn = 0;
    var loop = function(){
        turn++;
        setTimeout(loop, 200);
    };

    return {
        start:start
    }
}
