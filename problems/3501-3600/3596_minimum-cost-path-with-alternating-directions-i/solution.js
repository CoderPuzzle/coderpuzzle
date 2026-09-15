/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var minCost = function (m, n) {
    // From (0,0) every odd move goes to (0,1) or (1,0), and the forced even
    // move walks straight back (left/up leaves the grid otherwise), so the
    // walk is confined to {(0,0), (0,1), (1,0)} in any grid. Only three
    // destinations are therefore reachable.
    if (m === 1 && n === 1) return 1;
    if ((m === 1 && n === 2) || (m === 2 && n === 1)) return 3;
    return -1;
};
