kai = window.kai || {};

kai.Collider = function(){

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

    return {
        colliding: colliding
    };

};
