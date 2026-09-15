function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    // One rolling row of path counts: dp[j] holds the ways to reach
    // (current row, j), so the whole-grid DP collapses to a single row
    // that is reused as the scan moves down.
    const n = obstacleGrid[0].length;
    const dp: number[] = new Array(n).fill(0);
    // Seed a virtual row above the grid carrying one path into (0, 0),
    // withdrawn again when the start itself is an obstacle.
    dp[0] = 1 - obstacleGrid[0][0];
    for (const row of obstacleGrid) {
        for (let j = 0; j < n; ++j) {
            if (row[j] === 1) {
                // An obstacle is unreachable by definition, so it must
                // contribute nothing downstream: zero the cell.
                dp[j] = 0;
            } else if (j > 0) {
                // Ways into (i, j) = ways from above (still in dp[j])
                // plus ways from the left (dp[j - 1]).
                dp[j] += dp[j - 1];
            }
        }
    }
    return dp[n - 1];
}
