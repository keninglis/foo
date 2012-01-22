kai = window.kai || {}
kai.Game = function(board, actors, collider)
{
    var ticks = 0;

    // only start checking collisions after dispersal
    var checkCollisions = function(){};
    var initCheckCollisions = function() {
        checkCollisions = function() {
            var l = actors.length;
            for (i = 0; i < l; i++) {
                for (j = i+1; j<l; j++) {
                    collider.colliding(actors[i], actors[j]);
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
