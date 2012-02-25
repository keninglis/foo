"use strict";
// depends on kai

kai.levels = kai.levels || {};

kai.levels.Kaimall = function() {
    // player starting position
    this.startX = 212; this.startY = 477;
}

// param is callback for onload
kai.levels.Kaimall.prototype.load = function(cb){
    console.debug('Kai Mall loading...');

    var fp = new Image(); 
    //fp.src = 'levels/kaimall/ground_fp.gif';
    fp.src = 'levels/kaimall/mall_ground.png';
    var that = this;
    fp.onload = function() {
        var c = document.createElement('canvas');  
        c.width = fp.width;
        c.height = fp.height;
        that.floorPlanCtx = c.getContext('2d'); 
        that.floorPlanCtx.drawImage(fp,0,0);
        // expensive one off load of image data... to avoid future loads
        that.floorPlanData = that.floorPlanCtx.getImageData(0,0,c.width,c.height);
        //activate the real draw function
        that.draw = that._draw;
        cb();
    };
}

/*
 *  we can't draw until the image level is loaded so use a stub 
 */
kai.levels.Kaimall.prototype.draw = function(){};
kai.levels.Kaimall.prototype._draw = function(windowCtx,offsetX,offsetY){
    windowCtx.drawImage(this.floorPlanCtx.canvas,-offsetX,-offsetY);
};

kai.levels.Kaimall.prototype.tryAction = function(action) {
    if(!action) { return; }
    var obstacle;
    if(action.cmd) {
        if (action.cmd == 'forward') {
            var xFactor = Math.cos(action.actor.bearing);
            var xCentre = action.actor.x + xFactor * action.actor.speed;
            var xEdge = action.actor.x + xFactor * (action.actor.speed + action.actor.radius);

            var yFactor = Math.sin(action.actor.bearing);
            var yCentre = action.actor.y + yFactor * action.actor.speed;
            var yEdge = action.actor.y + yFactor * (action.actor.speed + action.actor.radius);

            obstacle = this.obstacle(xEdge,yEdge);

            if(obstacle == kai.OBS_WALL || obstacle == kai.OBS_GLASS ||
                obstacle == kai.OBS_SHUTTER
            ) { return { bounce: true }; }

            // default... just move through it
            return { move: [xCentre, yCentre] };
        }

        if (action.cmd == 'backward') {
        }
    }
};

kai.levels.Kaimall.prototype.getActors = function() {
    var actors = [];
    for(var i = 0; i < 100; i++) {
        actors.push(new kai.zombies.Normal(
            Math.random() * 400 + this.startX, 
            Math.random() * 500 + this.startY, 
            2 * Math.PI * Math.random()
        ));
    }
    return actors;
}

/* 
 * @return false|type of obstacle eg kai.OBS_WALL
 */
kai.levels.Kaimall.prototype.obstacle = function(x,y) {
    var pix = this.floorPlanPixel(x,y);
    if(pix[3] < 20) { return; }

    var r = pix[0], g = pix[1], b = pix[2], k = pix[3];

    if(r < 10 && g < 10 && b < 10) { return kai.OBS_WALL; }
    if(r > 220 && g < 10 && b < 10) { return kai.OBS_DOOR; }
    if(r > 250 && g < 10 && b > 200) { return kai.OBS_LIFTDOOR; }
    if(r < 10 && g < 10 && b > 250) { return kai.OBS_GLASS; }
    if(r < 10 && g > 250 && b > 200) { return kai.OBS_SHUTTER; }

    //console.debug('unidentified pixel',r,g,b,k); 
    return;
};

kai.levels.Kaimall.prototype.floorPlanPixel = function(x,y) {
    var x = Math.floor(x);
    var y = Math.floor(y);
    var pix = 4 * (y * this.floorPlanCtx.canvas.width + x);

    return [
        this.floorPlanData.data[pix], this.floorPlanData.data[pix+1],
        this.floorPlanData.data[pix+2], this.floorPlanData.data[pix+3]
    ];
};
