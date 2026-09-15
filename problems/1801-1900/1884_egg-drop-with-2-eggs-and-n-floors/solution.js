/**
 * @param {number} n
 * @return {number}
 */
var twoEggDrop = function (n) {
    let cover = 0,
        moves = 0;
    // cover = tallest building solvable with `moves` moves and 2 eggs.
    while (cover < n) {
        moves++;
        // First drop goes at cover+1: m-1 floors below for the surviving egg's
        // linear scan, cover(m-1) floors above — so cover(m) = cover(m-1) + m,
        // i.e. the triangular numbers m(m+1)/2.
        cover += moves;
    }
    // Smallest move budget whose triangular coverage reaches n.
    return moves;
};
