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
    if(action.move) {
        var newX = action.move[0]+action.move[2];
        var newY = action.move[1]+action.move[3];
        /*
        var targetPixel = this.floorPlanPixel(newX,newY); 
        if(targetPixel[3] > 0) { 
            console.debug(targetPixel);
            return; 
        }
        */
        return { move: [newX, newY] };
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


kai.levels.Kaimall.prototype.floorPlanPixel = function(x,y) {
    var x = Math.floor(x);
    var y = Math.floor(y);
    var pix = 4 * (y * this.floorPlanCtx.canvas.width + x);

    return [
        this.floorPlanData.data[pix], this.floorPlanData.data[pix+1],
        this.floorPlanData.data[pix+2], this.floorPlanData.data[pix+3]
    ];
};
