kai = window.kai || {};

// NB radius and centre
kai.ShipActor = function(settings)
{
    var arcEnd = 2 * Math.PI; // full circle
    var defaults = { 
        x:150,y:150,r:20,
        speed: 1, rBearing: 0,
        maxSpeed:5,
        turn: Math.PI/20, // pi == 180deg, turn in radians
        thrust: .5,
        fillStyle:'rgba(255,0,0,1)',
        cockpitFill:'rgba(255,255,255,.3)',
        cockpitStroke:'rgba(20,20,20,.5)'
        };
    var settings = $.extend({}, defaults, settings);

    var y = settings.y;
    var x = settings.x;
    var speed = settings.speed;

    var r = settings.r;

    // want tips of tail to touch circle ...
    var tailAdjust = Math.sqrt(r * r / 2); 

    var rBearing = settings.rBearing; // radians 0 is east

    var move = function(ctx,events) {

        if(events.direction) {
            if(events.direction == 'left') {
                rBearing -= settings.turn;
            } else {
                rBearing += settings.turn;
            }
            events.direction = false;
        }

        if(events.thrust) {
            if(events.thrust == 'on') {
                speed += settings.thrust; 
                if(speed > settings.maxSpeed) { speed = settings.maxSpeed; }
            } else {
                speed -= settings.thrust;
                if(speed < 0) { speed = 0; }
            }
            console.debug(speed);
            events.thrust = false;
        }

        dx = Math.cos(rBearing) * speed;
        dy = Math.sin(rBearing) * speed;

        var _x = x + dx; var _y = y+dy;

        // canvas boundaries
        if(_x < r) { _x = r; dx *= -1; }
        if(_y < r) { _y = r; dy *= -1; }
        if(_x + r > ctx.canvas.width) { _x = ctx.canvas.width - r; dx *= -1; }
        if(_y + r > ctx.canvas.height) { _y = ctx.canvas.height - r; dy *= -1; }

        x = _x; y = _y;

        // calculate new bearing (from east)
        if(dx && dy) {
            rBearing = Math.atan2(dy,dx); // radian
        }

        // translate to centre of ship, rotate
        ctx.save();
        ctx.translate(x,y); 
        ctx.rotate(rBearing); // 5 deg
        // draw from centre pointing east
        ctx.beginPath();
        ctx.moveTo(r,0);
        ctx.lineTo(-tailAdjust,tailAdjust);
        ctx.lineTo(-r/2,0);
        ctx.lineTo(-tailAdjust,-tailAdjust);
        ctx.lineTo(r,0);
        ctx.stroke();
        ctx.fillStyle = settings.fillStyle;
        ctx.fill();

        // cockpit
        ctx.beginPath();
        ctx.arc(4,0,r/4,2,-2,true);
        ctx.strokeStyle = settings.cockpitStroke;
        ctx.fillStyle = settings.cockpitFill;
        ctx.fill()
        ctx.stroke();
        ctx.closePath();
        
        // and restore saved settings
        ctx.restore();
    };

    return {
        move:move
    };
}

// NB from x,y with height and width
kai.SquareActor = function(settings)
{
    var defaults = { x:150,y:150,side:20,dx:1,dy:1,fillStyle:'rgba(200,0,0,0.5)' };
    var settings = $.extend({}, defaults, settings);

    var dx = settings.dx;
    var dy = settings.dy;
    var side = settings.side;
    var y = settings.y;
    var x = settings.x;

    var move = function(ctx) {
        var _x = x + dx; var _y = y+dy;
        if(_x < 0) { _x = 0; dx *= -1; }
        if(_y < 0) { _y = 0; dy *= -1; }

        if(_x + side > ctx.canvas.width) { _x = ctx.canvas.width - side; dx *= -1; }
        if(_y + side > ctx.canvas.height) { _y = ctx.canvas.height - side; dy *= -1; }
        x = _x; y = _y;

        ctx.fillStyle = settings.fillStyle;  
        ctx.fillRect (x,y,side,side);    
    };

    return {
        move:move
    };
}

// NB radius and centre
kai.CircleActor = function(settings)
{
    var arcEnd = 2 * Math.PI; // full circle
    var defaults = { x:150,y:150,r:20,dx:1,dy:1,fillStyle:'rgba(200,0,0,0.5)' };
    var settings = $.extend({}, defaults, settings);

    var dx = settings.dx;
    var dy = settings.dy;
    var r = settings.r;
    var y = settings.y;
    var x = settings.x;

    var move = function(ctx) {
        var _x = x + dx; var _y = y+dy;
        if(_x < r) { _x = r; dx *= -1; }
        if(_y < r) { _y = r; dy *= -1; }

        if(_x + r > ctx.canvas.width) { _x = ctx.canvas.width - r; dx *= -1; }
        if(_y + r > ctx.canvas.height) { _y = ctx.canvas.height - r; dy *= -1; }
        x = _x; y = _y;

        
        ctx.fillStyle = settings.fillStyle;  
        ctx.beginPath();
        ctx.arc(x,y,r,0,arcEnd);
        ctx.strokeStyle = 'rgba(20,20,20,.1)';
        ctx.stroke();
        ctx.fill();
    };

    return {
        move:move
    };
}

kai.Game = function(setup) {

    var setup = setup || {};
    var actors = setup.actors || [];

    var events = {
        direction: false,
        thrust: false
    };
    window.onkeydown = function(e) {
        switch(e.keyCode) {
            case 37: events.direction = 'left'; break;
            case 39: events.direction = 'right'; break;
            case 38: events.thrust = 'on'; break;
            case 40: events.thrust = 'off'; break;
        }
        //console.debug(e.keyCode,events.direction);
    };

    var canvas = document.getElementById('board');
    var ctx = canvas.getContext('2d');

    var turns = 0;

    var wipeBoard = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);    
    }


    var writeScore = function(msg) {
        ctx.fillStyle = "rgba(0,200,0,0.5)";  
        ctx.font = '24px Helvetica';    
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        ctx.fillText(msg,canvas.width - 4,4);
    };

    var loop = function() {
        wipeBoard();
        turns++;
        writeScore(turns);
        for(var i in actors) {
            actors[i].move(ctx,events);
        }
        setTimeout(loop, 50);
    };

    return {
        start: loop 
    }
    
};

