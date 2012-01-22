var kai = kai || {};

kai.levels = kai.levels || {};

// @param board { background, items, actors, $control }
kai.levels.awaken = function(board) {
    console.debug('awaken');

    var wall = 4; halfWall = 2; 
    var rooms = [
        { 
            x:0,y:0,x2:100,y2:190,
            name: 'Storeroom',
            desc: 'top1',
            draw: function(ctx) {  
                ctx.fillStyle = 'rgba(255,0,0,.2)';
                ctx.fillRect(this.x,this.y,this.x2,this.y2);
            }
        },
        { 
            x:100,y:0,x2:100,y2:150,
            name: 'Storeroom',
            desc: 'top2',
            draw: function(ctx) {  
                ctx.fillStyle = 'rgba(0,0,255,.2)';
                ctx.fillRect(this.x,this.y,this.x2,this.y2);
            }
        },
        { 
            x:200,y:0,x2:100,y2:150,
            name: 'Storeroom',
            desc: 'top3',
            draw: function(ctx) {  
                ctx.fillStyle = 'rgba(255,0,0,.2)';
                ctx.fillRect(this.x,this.y,this.x2,this.y2);
            }
        },
        { 
            x:300,y:0,x2:100,y2:150,
            name: 'Storeroom',
            desc: 'top4',
            draw: function(ctx) {  
                ctx.fillStyle = 'rgba(0,0,255,.2)';
                ctx.fillRect(this.x,this.y,this.x2,this.y2);
            }
        },
        { 
            x:0,y:190,x2:300,y2:210,
            name: 'Storeroom',
            desc: 'bottom1',
            draw: function(ctx) {  
                ctx.fillStyle = 'rgba(0,0,255,.2)';
                ctx.fillRect(this.x,this.y,this.x2,this.y2);
            }
        }

    ];

    var drawBackground = function(ctx) {
        ctx.lineWidth = wall;
        var n = rooms.length;
        for(var i = 0; i < n; i++) {
            rooms[i].draw(ctx);
        }
    };
    drawBackground(board.background);

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
