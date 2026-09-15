/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var maxPathScore = function (grid, k) {
    const m = grid.length,
        n = grid[0].length;
    // A path starts on a free cell, so it can charge at most m + n - 2
    // times: budget states beyond min(k, m + n - 2) cannot occur.
    const cap = Math.min(k, m + n - 2);
    // dp[j][c]: best score collected on a path ending at column j of the
    // current row with total cost exactly c; unreachable states sit far
    // below every real score. Cell (0, 0) is 0 by the constraints, so it
    // seeds score 0 at cost 0.
    const unreachable = -(1 << 30);
    let dp = Array.from({ length: n }, () => Array(cap + 1).fill(unreachable));
    dp[0][0] = 0;
    for (let i = 0; i < m; i++) {
        const next = Array.from({ length: n }, () => Array(cap + 1).fill(unreachable));
        for (let j = 0; j < n; j++) {
            const charge = grid[i][j] > 0 ? 1 : 0;
            for (let c = charge; c <= cap; c++) {
                let best = unreachable;
                if (dp[j][c - charge] > best) {
                    best = dp[j][c - charge];
                }
                if (j > 0 && next[j - 1][c - charge] > best) {
                    best = next[j - 1][c - charge];
                }
                if (best > unreachable / 2) {
                    next[j][c] = best + grid[i][j];
                }
            }
        }
        dp = next;
    }
    const best = Math.max(...dp[n - 1]);
    return best >= 0 ? best : -1;
};
