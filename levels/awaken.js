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
    var floorPlanData = false;
    var floorPlanPixel = function(x,y) {
        var pix = 4 * (y * floorPlan.canvas.width + x);
        return [
            floorPlanData.data[pix], floorPlanData.data[pix+1],
            floorPlanData.data[pix+2], floorPlanData.data[pix+3]
        ];
        /*
        console.debug(
            x,y,pix,
            floorPlanData.data[pix], floorPlanData.data[pix+1],
            floorPlanData.data[pix+2], floorPlanData.data[pix+3]
        );
        */
    };
     

    // rewrite function: load image and then draw  
    var drawBackground = function(ctx) {
        drawBackground = function() { 

            var fp = new Image(); 
            //fp.src = 'levels/awaken_trans.png';
            fp.src = 'levels/kaimall/ground_fp.gif';
            fp.onload = function() {
                c = document.createElement('canvas');  
                c.width = fp.width;
                c.height = fp.height;
                floorPlan = c.getContext('2d'); 
                floorPlan.drawImage(fp,0,0);
                // expensive one off load of image data... to avoid future loads
                floorPlanData = floorPlan.getImageData(0,0,c.width,c.height);
                drawBackground = function(ctx) {
                    ctx.drawImage(c,-windowX,-windowY);
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
        
        var cX = windowX + halfWindowWidth + dX;
        var cY = windowY + halfWindowHeight + dY;

        var points = [
            [cX-r,cY-r],[cX-r,cY+r],[cX+r,cY+r],[cX+r,cY-r]
        ];
        for(var i in points){
            var pix = floorPlanPixel(points[i][0], points[i][1]);
            console.debug(pix);
            if(pix[3] >220) { return 1; }
            //if(pix[0] < 50) { return 1; } // wall
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
