kai = window.kai || {}
kai.Game = function(board, actors)
{
    var ticks = 0;

    /*
     * check if actors a and b are colliding
     */
    var colliding = function(a,b) {
        var aPos = a.position();
        var bPos = b.position();
        //console.debug(aPos,bPos);

        var dX = Math.abs(aPos.x - bPos.x); 
        var dY = Math.abs(aPos.y - bPos.y); 
        var threshold = aPos.r + bPos.r;
        if((dX < threshold) && (dY < threshold)) {
            b.collideWith(a);
            a.collideWith(b);
        }
    };

    // only start checking collisions after dispersal
    var checkCollisions = function(){};
    var initCheckCollisions = function() {
        checkCollisions = function() {
            var l = actors.length;
            for (i = 0; i < l; i++) {
                for (j = i+1; j<l; j++) {
                    colliding(actors[i], actors[j]);
                }
            }
        };
    };

    var pulse = function(){

        for(var i in actors) {
            actors[i].act();
            response = board.move(actors[i]);
        }
        checkCollisions();
        board.setScore(ticks++);
        setTimeout(pulse, 50);
    };
    pulse();
    setTimeout(initCheckCollisions, 1000);
}
