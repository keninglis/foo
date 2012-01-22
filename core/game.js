var kai = kai || {};

kai.game = function(startLevel) {
    console.debug('game');
    var level = startLevel;
    var start = function() {
        console.debug('start');
        loop();
    };

    // http://nokarma.org/2011/02/27/javascript-game-development-keyboard-input/index.html
    var key = {
        pressed:{},
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        isDown: function(code) { return this.pressed[code]; },
        onKeydown: function(e) { this.pressed[e.keyCode] = true; },
        onKeyup: function(e) { delete this.pressed[e.keyCode]; }
    };
    window.addEventListener('keyup', function(e) { key.onKeyup(e); }, false);
    window.addEventListener('keydown', function(e) { key.onKeydown(e); }, false);



    var turn = 0;
    var loop = function(){
        turn++;
        level.update(key,turn);
        level.draw();
        setTimeout(loop, 50);
    };

    return {
        start:start
    }
}
