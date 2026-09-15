/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function (grid) {
    const n = grid.length;
    // dp[r1][r2]: best cherries with walker 1 at (r1, t-r1) and walker 2 at
    // (r2, t-r2) after t steps; -1 marks unreachable states.
    let dp = Array.from({ length: n }, () => new Array(n).fill(-1));
    dp[0][0] = grid[0][0];
    for (let t = 1; t <= 2 * n - 2; t++) {
        const ndp = Array.from({ length: n }, () => new Array(n).fill(-1));
        const lo = Math.max(0, t - n + 1);
        const hi = Math.min(n - 1, t);
        for (let r1 = lo; r1 <= hi; r1++) {
            const c1 = t - r1;
            if (grid[r1][c1] === -1) continue;
            for (let r2 = r1; r2 <= hi; r2++) {
                const c2 = t - r2;
                if (grid[r2][c2] === -1) continue;
                let best = -1;
                for (let pr1 = r1 - 1; pr1 <= r1; pr1++) {
                    for (let pr2 = r2 - 1; pr2 <= r2; pr2++) {
                        if (pr1 >= 0 && pr1 < n && pr2 >= 0 && pr2 < n) {
                            best = Math.max(best, dp[pr1][pr2]);
                        }
                    }
                }
                if (best < 0) continue;
                const gain = grid[r1][c1] + (r1 !== r2 ? grid[r2][c2] : 0);
                ndp[r1][r2] = best + gain;
            }
        }
        dp = ndp;
    }
    return Math.max(dp[n - 1][n - 1], 0);
};
