/**
 * @param {string[][]} grid
 * @return {boolean}
 */
var hasValidPath = function (grid) {
    // dp[r][c] is the set of balances reachable at that cell, where the
    // balance counts '(' minus ')' along the path. A prefix whose balance
    // ever goes negative can never close into a valid string, so those
    // balances are dropped as each move is extended.
    const m = grid.length;
    const n = grid[0].length;
    const start = grid[0][0] === "(" ? 1 : -1;
    if (start < 0) return false;
    const dp = Array.from({ length: m }, () => Array.from({ length: n }, () => new Set()));
    dp[0][0].add(start);
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            for (const balance of dp[r][c]) {
                if (r + 1 < m) {
                    const nb = balance + (grid[r + 1][c] === "(" ? 1 : -1);
                    if (nb >= 0) dp[r + 1][c].add(nb);
                }
                if (c + 1 < n) {
                    const nb = balance + (grid[r][c + 1] === "(" ? 1 : -1);
                    if (nb >= 0) dp[r][c + 1].add(nb);
                }
            }
        }
    }
    return dp[m - 1][n - 1].has(0);
};
