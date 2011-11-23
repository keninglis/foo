kai = window.kai || {};

kai.Board = function(){
    var target = 'board'
    var h = 500, w  = 500; 
    var border = 30;

    var boardTop = border;
    var boardLeft = border;
    var boardRight = w - border;
    var boardBottom = h - border;


    var board = Raphael(target,h,w);
    var score;

    var drawBox = function() {
        // Francesca wanted blue border :(
        board
            .path('M {0} {1} 0 h{2} v{3} h-{2} v-{3}', 0,0, w, h)
            .attr({gradient:'90-#039-#39f'});

        // the field
        board
            .path(
                'M {0} {1} 0 h{2} v{3} h-{2} v-{3}', 
                border,border, w -(2*border), h - (2*border)
            )
            .attr({gradient: '45-white-blue'})

        score = board.text(w/2, border/2, 'loading...');
    };

    // move actors, bouncing at edges
    var move =  function(actor) {
        var dest = actor.destination();
        if(dest.x >= boardRight){ dest.x = boardRight; actor.reverseX();}
        if(dest.x <= boardLeft){ dest.x = boardLeft; actor.reverseX(); }
        if(dest.y >= boardBottom) { dest.y = boardBottom; actor.reverseY(); }
        if(dest.y <= boardTop) { dest.y = boardTop; actor.reverseY(); }
        actor.position(dest);
    };

    var setScore = function(msg) {
        score.attr('text', msg);
    };

    drawBox();

    return {
        board: board,
        move: move,
        setScore: setScore
    };
}

