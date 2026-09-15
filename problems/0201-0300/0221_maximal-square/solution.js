/**
 * @param {string[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let best = 0;
    // Two rolling rows of length n + 1: dp[i][j] is the side of the largest
    // all-ones square ending at (i, j); the leading zero column stands in
    // for the out-of-bounds left border.
    let prev = new Array(n + 1).fill(0);
    for (let i = 0; i < m; i++) {
        const curr = new Array(n + 1).fill(0);
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === "1") {
                // A square growing out of this corner must fit inside all
                // three predecessors: up, left, and diagonal — so the
                // minimum is the binding constraint.
                curr[j + 1] = Math.min(prev[j], prev[j + 1], curr[j]) + 1;
                if (curr[j + 1] > best) {
                    best = curr[j + 1];
                }
            }
        }
        prev = curr;
    }
    return best * best;
};
