impl Solution {
    pub fn unique_paths_with_obstacles(obstacle_grid: Vec<Vec<i32>>) -> i64 {
        // One rolling row of path counts: dp[j] holds the ways to reach
        // (current row, j), so the whole-grid DP collapses to a single row
        // that is reused as the scan moves down.
        let n = obstacle_grid[0].len();
        let mut dp = vec![0i64; n];
        // Seed a virtual row above the grid carrying one path into (0, 0),
        // withdrawn again when the start itself is an obstacle.
        dp[0] = (1 - obstacle_grid[0][0]) as i64;
        for row in &obstacle_grid {
            for j in 0..n {
                if row[j] == 1 {
                    // An obstacle is unreachable by definition, so it must
                    // contribute nothing downstream: zero the cell.
                    dp[j] = 0;
                } else if j > 0 {
                    // Ways into (i, j) = ways from above (still in dp[j])
                    // plus ways from the left (dp[j - 1]).
                    dp[j] += dp[j - 1];
                }
            }
        }
        dp[n - 1]
    }
}
