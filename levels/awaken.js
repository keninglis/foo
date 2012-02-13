var kai = kai || {};

kai.levels = kai.levels || {};

// @param board { background, items, actors, $control }
kai.levels.awaken = function(board) {
    console.debug('awaken');

    var boardWidth = 500; var boardHeight = 500;
    var tileWidth = boardWidth / 20;
    var halfWindowHeight = Math.floor(board.actors.canvas.height / 2);
    var halfWindowWidth = Math.floor(board.actors.canvas.width / 2);
    var windowX = 0; var windowY = 0;

    var floorPlan = false;

    // rewrite function: load image and then draw  
    var drawBackground = function(ctx) {
        drawBackground = function() { 
            floorPlan = new Image(); 
            floorPlan.src = 'levels/awaken_trans.png';
            floorPlan.onload = function() {
                drawBackground = function(ctx) {
                    ctx.drawImage(floorPlan,-windowX,-windowY);
                };
            };
            drawBackground = function(){};
        };
    };

    var player = {
        x: 290, y: 885,
        v: 2,
        r: 6,
        arcEnd: 2 * Math.PI,
        draw: function(ctx) {
            ctx.beginPath(); 
            ctx.arc(halfWindowHeight,halfWindowHeight,this.r,0,this.arcEnd);
            ctx.fillStyle = 'green';
            ctx.fill();
        },
        up: function(){ 
            var newY = this.y - this.v; 
            //if(moveResult(0, -(this.v+this.r)) == 0) { this.y = newY; }
            if(moveResult(0, -this.v, this.r) == 0) { this.y = newY; }
        },
        down: function(){
            var newY = this.y + this.v;
            if(moveResult(0,this.v,this.r) == 0) { this.y = newY; }
        },
        left: function(){
            var newX = this.x - this.v;
            if(moveResult(-this.v,0,this.r) == 0) { this.x = newX; }
        },
        right: function(){
            var newX = this.x + this.v;
            if(moveResult(this.v,0,this.r) == 0) { this.x = newX; }
        },
    };

    var moveResult = function(dX,dY,r){
        console.debug(dX,dY);
        var cX = halfWindowWidth + dX;
        var cY = halfWindowHeight + dY;
        var points = [
            [cX-r,cY-r],[cX-r,cY+r],[cX+r,cY+r],[cX+r,cY-r]
        ];
        for(var i in points){
            var imgData = board.background.getImageData(points[i][0],points[i][1],1,1);
            console.debug(points[i],imgData.data[0]);
            if(imgData.data[0] < 50) { return 1; } // wall

        }
        return 0;// OK 
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
            player.up(); moved = true; 
        }
        if(key.isDown(key.DOWN)) { 
            player.down(); moved = true; 
        }
        if(key.isDown(key.LEFT)) { 
            player.left(); moved = true; 
        }
        if(key.isDown(key.RIGHT)) { 
            player.right(); moved = true; 
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
