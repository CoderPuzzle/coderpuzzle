/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePaths = function (grid) {
    const m = grid.length;
    const n = grid[0].length;
    const MOD = 1e9 + 7;
    // Landing tables for mirror cells: entering a mirror while moving
    // right (br) turns the move down, while moving down (bd) turns it
    // right; -1 marks a chain that leaves the grid. Each deflection lands
    // one row below or one column right of the mirror hit, so a reverse
    // row-major sweep resolves every chain against entries that are
    // already final.
    const br = new Array(m * n).fill(-1);
    const bd = new Array(m * n).fill(-1);
    for (let i = m - 1; i >= 0; --i) {
        for (let j = n - 1; j >= 0; --j) {
            if (grid[i][j] === 0) continue;
            const t = i * n + j;
            if (i + 1 < m) {
                br[t] = grid[i + 1][j] === 0 ? t + n : bd[t + n];
            }
            if (j + 1 < n) {
                bd[t] = grid[i][j + 1] === 0 ? t + 1 : br[t + 1];
            }
        }
    }
    // dp[k] counts the ways to stand on cell k. Every jump lands in a
    // strictly later row than the cell it leaves, so one row-major sweep
    // settles each cell before any descendant reads it.
    const dp = new Array(m * n).fill(0);
    dp[0] = 1;
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            const v = dp[i * n + j];
            if (v === 0) continue;
            if (j + 1 < n) {
                const t = i * n + j + 1;
                const tgt = grid[i][j + 1] === 0 ? t : br[t];
                if (tgt >= 0) dp[tgt] = (dp[tgt] + v) % MOD;
            }
            if (i + 1 < m) {
                const t = (i + 1) * n + j;
                const tgt = grid[i + 1][j] === 0 ? t : bd[t];
                if (tgt >= 0) dp[tgt] = (dp[tgt] + v) % MOD;
            }
        }
    }
    return dp[m * n - 1];
};
