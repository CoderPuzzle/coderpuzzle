/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var numberOfPaths = function (grid, k) {
    const MOD = 1000000007;
    const m = grid.length;
    const n = grid[0].length;
    // dp[j][v] = paths reaching column j whose sum is v (mod k). When cell
    // (i, j) is computed, dp[j] still holds the row above and dp[j-1]
    // already holds the current row's left neighbor.
    let dp = new Array(n).fill(null);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const g = ((grid[i][j] % k) + k) % k;
            if (i === 0 && j === 0) {
                // Seed: the single corner path has remainder g.
                const first = new Array(k).fill(0);
                first[g] = 1;
                dp[j] = first;
                continue;
            }
            const cur = new Array(k).fill(0);
            // A path arriving with remainder r leaves with (r + g) % k,
            // so target v pulls from incoming (v - g) mod k.
            if (i > 0 && dp[j] !== null) {
                const above = dp[j];
                for (let v = 0; v < k; v++) {
                    const src = (((v - g) % k) + k) % k;
                    cur[v] = above[src];
                }
            }
            if (j > 0 && dp[j - 1] !== null) {
                const left = dp[j - 1];
                for (let v = 0; v < k; v++) {
                    const src = (((v - g) % k) + k) % k;
                    cur[v] = (cur[v] + left[src]) % MOD;
                }
            }
            dp[j] = cur;
        }
    }
    // Answer = remainder-0 paths reaching the bottom-right cell.
    return dp[n - 1][0] % MOD;
};
