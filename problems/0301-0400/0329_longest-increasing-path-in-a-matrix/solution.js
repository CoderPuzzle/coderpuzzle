/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
    const m = matrix.length,
        n = matrix[0].length;
    const cells = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) cells.push([matrix[i][j], i, j]);
    }
    // Strictly increasing paths make the cells a DAG (edges point to
    // larger neighbors), so ascending value order is a topological order.
    cells.sort((a, b) => a[0] - b[0]);
    // dp[i][j] = longest increasing path starting at (i, j); 1 = cell alone.
    const dp = Array.from({ length: m }, () => new Array(n).fill(1));
    let best = 1;
    for (const [v, i, j] of cells) {
        // Smaller neighbors appear earlier in the sort, so their dp is
        // final; strict < so equal-valued neighbors never link.
        for (const [di, dj] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const ni = i + di,
                nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] < v) {
                if (dp[ni][nj] + 1 > dp[i][j]) dp[i][j] = dp[ni][nj] + 1;
            }
        }
        if (dp[i][j] > best) best = dp[i][j];
    }
    return best;
};
