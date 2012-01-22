var kai = kai || {};

kai.levels = kai.levels || {};

// @param board { background, items, actors, $control }
kai.levels.awaken = function(board) {
    console.debug('awaken');

    var player = {
        x: 10, y: 10,
        v: 2,
        arcEnd: 2 * Math.PI,
        draw: function(ctx) {
            ctx.beginPath(); 
            ctx.arc(this.x,this.y,5,0,this.arcEnd);
            ctx.fillStyle = 'green';
            ctx.fill();
        },
        up: function(){this.y -= this.v;},
        down: function(){this.y += this.v;},
        left: function(){this.x -= this.v;},
        right: function(){this.x += this.v;},
    };

    var update = function(key,turn) {
        if(key.isDown(key.UP)) { player.up(); }
        if(key.isDown(key.DOWN)) { player.down(); }
        if(key.isDown(key.LEFT)) { player.left(); }
        if(key.isDown(key.RIGHT)) { player.right(); }
    };

    var clearCtx = function(ctx) {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    };

    var draw = function() {
        clearCtx(board.actors);
        player.draw(board.actors);
    };

    return {
        update:update,
        draw:draw
    };
}
