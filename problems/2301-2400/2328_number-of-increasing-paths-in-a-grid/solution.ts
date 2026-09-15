function countPaths(grid: number[][]): number {
    const MOD = 1000000007;
    const m = grid.length,
        n = grid[0].length;
    const cells: number[][] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) cells.push([grid[i][j], i, j]);
    }
    // Decreasing value order: when (i, j) is handled, every strictly
    // larger neighbor's dp entry is already final.
    cells.sort((x, y) => y[0] - x[0]);
    // dp[i][j] = number of increasing paths starting at (i, j);
    // 1 accounts for the length-1 path of the cell itself.
    const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(1));
    for (const [v, i, j] of cells) {
        for (const [di, dj] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const ni = i + di,
                nj = j + dj;
            // Strict '>' skips equal values, so plateau cells never chain.
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] > v) {
                dp[i][j] = (dp[i][j] + dp[ni][nj]) % MOD;
            }
        }
    }
    // A path is identified by its starting cell, so sum dp everywhere.
    let total = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) total = (total + dp[i][j]) % MOD;
    }
    return total;
}
