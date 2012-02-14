var kai = kai || {};

// based on http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
kai.input = function(win) {
    var input = {
        pressed:{},
        LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,  // arrows
        // LEFT: 65, UP: 87, RIGHT: 68, DOWN: 83,    // WSAD
        isDown: function(code) { return this.pressed[code]; },
        onKeydown: function(e) { this.pressed[e.keyCode] = true; },
        onKeyup: function(e) { delete this.pressed[e.keyCode]; }
    };
    win.addEventListener('keyup', function(e) { input.onKeyup(e); }, false);
    win.addEventListener('keydown', function(e) { input.onKeydown(e); }, false);
    return input;
}
