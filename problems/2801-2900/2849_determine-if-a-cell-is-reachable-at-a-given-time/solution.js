/**
 * @param {number} sx
 * @param {number} sy
 * @param {number} fx
 * @param {number} fy
 * @param {number} t
 * @return {boolean}
 */
var isReachableAtTime = function (sx, sy, fx, fy, t) {
    // Each second moves at most one cell in both x and y (king
    // moves), so the Chebyshev distance max(|dx|, |dy|) is the
    // minimum number of seconds; any surplus can be absorbed by
    // expanding one diagonal step into two orthogonal steps (+1) or
    // by ping-ponging between two cells (+2 each). Only a start on
    // the target itself flips the test: there zero seconds suffice,
    // one second never does (a move is forced), and from two seconds
    // on an out-and-back walk works.
    if (sx === fx && sy === fy) {
        return t !== 1;
    }
    return Math.max(Math.abs(sx - fx), Math.abs(sy - fy)) <= t;
};
