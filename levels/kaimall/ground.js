var kai = kai || {};

kai.levels = kai.levels || {};

kai.levels.Kaimall = function() {
    // starting position
    this.startX = 212; this.startY = 477;
}

// param is callback for onload
kai.levels.Kaimall.prototype.load = function(cb){
    console.debug('Kai Mall loading...');

    var fp = new Image(); 
    fp.src = 'levels/kaimall/ground_fp.gif';
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
    if(action.move) {
        return { move: [action.move[0]+action.move[2], action.move[1]+action.move[3]] };
    }
};

kai.levels.Kaimall.prototype.getActors = function() {
    var actors = [];
    for(var i = 0; i < 50; i++) {
        actors.push(new kai.zombies.Normal(
            Math.random() * 200 + this.startX, 
            Math.random() * 200 + this.startY, 
            2 * Math.PI * Math.random()
        ));
    }
    return actors;
}
