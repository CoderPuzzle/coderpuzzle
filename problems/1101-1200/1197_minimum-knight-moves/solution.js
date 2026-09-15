/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var minKnightMoves = function (x, y) {
    // Mirror symmetry folds every target into the first quadrant; a knight
    // never needs to leave the window two squares past it.
    var tx = Math.abs(x);
    var ty = Math.abs(y);
    var moves = [
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
    ];
    var key = function (nx, ny) {
        return nx + 2 + "," + (ny + 2);
    };
    var seen = Object.create(null);
    seen[key(0, 0)] = true;
    var queue = [[0, 0]];
    var head = 0;
    var steps = 0;
    while (head < queue.length) {
        var size = queue.length - head;
        for (var s = 0; s < size; s++) {
            var cell = queue[head++];
            if (cell[0] === tx && cell[1] === ty) {
                return steps;
            }
            for (var i = 0; i < moves.length; i++) {
                var nx = cell[0] + moves[i][0];
                var ny = cell[1] + moves[i][1];
                if (-2 <= nx && nx <= tx + 2 && -2 <= ny && ny <= ty + 2) {
                    var k = key(nx, ny);
                    if (!seen[k]) {
                        seen[k] = true;
                        queue.push([nx, ny]);
                    }
                }
            }
        }
        steps++;
    }
    throw new Error("unreachable");
};
