var kai = kai || {};

kai.levels = kai.levels || {};

// @param board { background, items, actors, $control }
kai.levels.awaken = function(board) {
    console.debug('awaken');

    var boardWidth = 500; var boardHeight = 500;
    var tileWidth = 25;
    var halfWindowHeight = Math.floor(board.actors.canvas.height / 2);
    var halfWindowWidth = Math.floor(board.actors.canvas.width / 2);
    var windowX = 0; var windowY = 0;

    var rooms = [
        // the border
        { 
            x:0,y:0,x2:boardWidth,y2:boardHeight,
            draw: function(ctx) { 
                ctx.strokeRect(this.x,this.y,this.x2,this.y2);
            }
        },
        { 
            x:0,y:0,x2:6*tileWidth,y2:4*tileWidth,
            title: 'awaken', 
            draw: function(ctx) { 
                ctx.strokeRect(this.x,this.y,this.x2,this.y2);
            }
        },
        { 
            x:2*tileWidth,y:4*tileWidth,x2:4*tileWidth,y2:6*tileWidth,
            title: 'awaken', 
            draw: function(ctx) { 
                ctx.strokeRect(this.x,this.y,this.x2,this.y2);
            }
        },
        { 
            x:2*tileWidth,y:10*tileWidth,x2:4*tileWidth,y2:6*tileWidth,
            title: 'awaken', 
            draw: function(ctx) { 
                //ctx.fillStyle = 'rgba(255,255,255,.3)';
                //ctx.fillRect(this.x,this.y,this.x2,this.y2);
                ctx.strokeRect(this.x,this.y,this.x2,this.y2);
            }
        }

    ];

    var drawBackground = function(ctx) {
        ctx.save();
        ctx.translate(-windowX,-windowY);
        for(i in rooms) {
            rooms[i].draw(ctx);
        }
        ctx.restore();
    };

    var player = {
        x: tileWidth, y: 10*tileWidth,
        v: 2,
        w: 6,
        arcEnd: 2 * Math.PI,
        draw: function(ctx) {
            ctx.beginPath(); 
            //ctx.arc(this.x,this.y,5,0,this.arcEnd);
            ctx.arc(halfWindowHeight,halfWindowHeight,this.w,0,this.arcEnd);
            ctx.fillStyle = 'green';
            ctx.fill();
        },
        up: function(){this.y -= this.v;},
        down: function(){this.y += this.v;},
        left: function(){this.x -= this.v;},
        right: function(){this.x += this.v;},
    };

    var moveWindow = function() {
        windowX = player.x - halfWindowWidth;
        windowY = player.y - halfWindowHeight;
        board.$control.html([player.x, player.y].join(','));
    };
    moveWindow();

    var update = function(key,turn) {
        var moved = false;
        if(key.isDown(key.UP)) { 
            if(player.y > 0) {
                player.up(); moved = true; 
            }
        }
        if(key.isDown(key.DOWN)) { 
            if(player.y < boardHeight) {
                player.down(); moved = true; 
            }
        }
        if(key.isDown(key.LEFT)) { 
            if(player.x > 0) {
                player.left(); moved = true; 
            }
        }
        if(key.isDown(key.RIGHT)) { 
            if(player.x < boardWidth) {
                player.right(); moved = true; 
            }
        }
        if(moved) {
            moveWindow();
        }

    };

    var clearCtx = function(ctx) {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    };

    var draw = function() {
        clearCtx(board.actors);
        player.draw(board.actors);
        clearCtx(board.background);
        drawBackground(board.background);
    };

    return {
        update:update,
        draw:draw
    };
}
