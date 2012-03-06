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
            var newCentre = [
                action.actor.x+Math.cos(action.actor.bearing)*action.actor.speed,
                action.actor.y+Math.sin(action.actor.bearing)*action.actor.speed
            ];
            return this.tryMove(newCentre, action.actor);
        }

        if (action.cmd == 'backward') {
            // backwards is slower
            var newCentre = [
            action.actor.x+Math.cos(action.actor.bearing)*action.actor.speed*-.3,
            action.actor.y+Math.sin(action.actor.bearing)*action.actor.speed*-.3
            ];
            return this.tryMove(newCentre, action.actor);
        }
    }
};

kai.levels.Kaimall.prototype.tryMove = function(newCentre,actor) {
    var obstacle;
    for(var i in actor.testGrid) {
        obstacle = this.obstacle(
            newCentre[0]+actor.testGrid[i][0], 
            newCentre[1]+actor.testGrid[i][1]
        );
        if(obstacle) { break; }
    }

    if(obstacle == kai.OBS_WALL || obstacle == kai.OBS_GLASS ||
            obstacle == kai.OBS_SHUTTER
      ) { return { bounce: true }; }

    return { move: newCentre };
};

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

// populate the level 
kai.levels.Kaimall.prototype.getActors = function() {
    var actors = [];
    for(var i = 0; i < 1000; i++) {
        actors.push(new kai.Zombie(
            344,300, 2 * Math.PI * Math.random()
        ));
    }
    return actors;
}

// can the actor see the player
kai.levels.Kaimall.prototype.lineOfSight = function(player,actor) {
    var distance = Math.sqrt(
        Math.pow(player.x-actor.x,2) + Math.pow(player.y-actor.y,2)
    );
    if(distance > 140) { return false; }
    var step = 3; // test every n pixels
    var bearing = actor.bearingToPlayer(player); 
    var dy = Math.sin(bearing);
    var dx = Math.cos(bearing);
    for(var i = step; i < distance; i+= step) {
        var obstacle = this.obstacle(actor.x + dx * i, actor.y + dy * i);
        if(obstacle === kai.OBS_WALL) { return false; }
    }
    return true;
};

