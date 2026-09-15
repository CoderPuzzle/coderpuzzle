/**
 * @param {number[][]} rooks
 * @return {number}
 */
var minMoves = function (rooks) {
    // Horizontal and vertical moves touch disjoint coordinates, and a
    // peaceful board needs row indices {0..n-1} once each (columns too).
    // So each axis decouples: pair the k-th smallest coordinate of that
    // axis with target index k-1 — rearrangement keeps this optimal.
    // Worst case per axis is n*(n-1)/2 <= 124750, so the total stays
    // exactly representable as a JS number (< 2^53 by miles).
    const xs = rooks.map((r) => r[0]).sort((a, b) => a - b);
    const ys = rooks.map((r) => r[1]).sort((a, b) => a - b);
    let moves = 0;
    for (let i = 0; i < rooks.length; i++) {
        moves += Math.abs(xs[i] - i) + Math.abs(ys[i] - i);
    }
    return moves;
};
