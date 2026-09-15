/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
    // Sweep the rows top to bottom carrying one row of answers: dp[j] is
    // the smallest sum of a falling path ending at the current row's
    // column j, built from the three reachable parents above.
    const n = matrix[0].length;
    let dp = matrix[0].slice();
    for (let r = 1; r < matrix.length; ++r) {
        const next = new Array(n);
        for (let j = 0; j < n; ++j) {
            let best = dp[j];
            if (j > 0 && dp[j - 1] < best) {
                best = dp[j - 1];
            }
            if (j + 1 < n && dp[j + 1] < best) {
                best = dp[j + 1];
            }
            next[j] = matrix[r][j] + best;
        }
        dp = next;
    }
    let ans = dp[0];
    for (let j = 1; j < n; ++j) {
        ans = Math.min(ans, dp[j]);
    }
    return ans;
};
