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
    if(action.cmd) {
        if (action.cmd == 'forward') {
            var xFactor = Math.cos(action.actor.bearing);
            var xCentre = action.actor.x + xFactor * action.actor.speed;
            var xEdge = action.actor.x + xFactor * (action.actor.speed + action.actor.radius);

            var yFactor = Math.sin(action.actor.bearing);
            var yCentre = action.actor.y + yFactor * action.actor.speed;
            var yEdge = action.actor.y + yFactor * (action.actor.speed + action.actor.radius);

            var targetPixel = this.floorPlanPixel(xEdge,yEdge);
            if(targetPixel[3] > 0) { return { bounce: true }; }
            return { move: [xCentre, yCentre] };
        }

        if (action.cmd == 'backward') {
            var newX = action.actor.x - (Math.cos(action.actor.bearing) * .3 * action.actor.speed);
            var newY = action.actor.y - (Math.sin(action.actor.bearing) * .3 * action.actor.speed);
            var targetPixel = this.floorPlanPixel(newX-action.actor.radius, newY-action.actor.radius);
            if(targetPixel[3] > 0) { return; }
            return { move: [newX, newY] };
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


kai.levels.Kaimall.prototype.floorPlanPixel = function(x,y) {
    var x = Math.floor(x);
    var y = Math.floor(y);
    var pix = 4 * (y * this.floorPlanCtx.canvas.width + x);

    return [
        this.floorPlanData.data[pix], this.floorPlanData.data[pix+1],
        this.floorPlanData.data[pix+2], this.floorPlanData.data[pix+3]
    ];
};
