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

    // get/set postion {x: y: }
    var position = function(newPosition) {
        if(newPosition) {
            view.attr('cx', newPosition.x);
            view.attr('cy', newPosition.y);
        }
        return {
            x: view.attr('cx'),
            y: view.attr('cy'),
            r: settings.r 
        };
    }
    // where are we heading for this turn
    // return{ x: y: }
    var destination = function() {
        return {
            x: view.attr('cx') + dx,
            y: view.attr('cy') + dy
        };
    }

    var stop = function() { dx = 0; dy = 0; };
    var reverse = function() { reverseX(); reverseY(); };
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
