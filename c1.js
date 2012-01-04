kai = window.kai || {};

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
            actors[i].move(ctx);
        }
        setTimeout(loop, 20);
    };

    return {
        start: loop 
    }
    
};

