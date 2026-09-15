/**
 * @param {number[]} values
 * @return {number}
 */
var minScoreTriangulation = function (values) {
    const n = values.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let gap = 2; gap < n; gap++) {
        for (let i = 0; i + gap < n; i++) {
            const j = i + gap;
            let best = Infinity;
            for (let k = i + 1; k < j; k++) {
                const candidate = dp[i][k] + dp[k][j] + values[i] * values[k] * values[j];
                if (candidate < best) {
                    best = candidate;
                }
            }
            dp[i][j] = best;
        }
    }
    return dp[0][n - 1];
};
