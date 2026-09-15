function isReachableAtTime(sx: number, sy: number, fx: number, fy: number, t: number): boolean {
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
}
