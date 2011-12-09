kai = window.kai || {}

kai.Actor = function(view, settings) {

    var defaults = {
        name: 'anonymous',
        dx: 0, 
        dy: 0,
        act: function(){} 
    };
    var settings = $.extend({}, defaults, settings);

    var name = settings.name;
    var dx = settings.dx;
    var dy = settings.dy;
    var act = settings.act;
    var bb = view.getBBox();

    var centre = function() {
        var rX = bb.width/2;
        var rY = bb.height/2;
        return { 
            x: bb.x + bb.width/2,
            y: bb.y + bb.height/2,
            rX: rX,
            rY: rY,
            r: (rX + rY)/2
        };
    };

    // get/set postion {x: y: }
    var position = function(newPosition) {
        if(newPosition) {
            c = centre();
            view.translate(newPosition.x - c.x, newPosition.y - c.y);
            bb = view.getBBox();
        }
        return centre();
    }

    // where are we heading for this turn
    // return{ x: y: }
    var destination = function() {
        var c = centre();
        return {
            x: c.x + dx,
            y: c.y + dy
        };
    }

    var stop = function() { dx = 0; dy = 0; };
    var reverse = function() { everseX(); reverseY(); };
    var reverseX = function() { dx *= -1; };
    var reverseY = function() { dy *= -1; };

    var brake = function(factor) {
        factor = factor || .1;
        if(Math.abs(dx) > 0.1) { dx -= (dx * factor); }    
        if(Math.abs(dy) > 0.1) { dy -= (dy * factor); }    
    };

    var collideWith = function(actor) {
        //console.debug(actor.name);
        //actor.stop();
    };

    return {
        name: name,
        act: act,
        stop: stop,
        destination: destination,
        position: position,
        reverse: reverse,
        reverseX: reverseX,
        reverseY: reverseY,
        brake: brake,
        collideWith: collideWith
    }

}
