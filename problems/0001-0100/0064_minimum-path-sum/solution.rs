impl Solution {
    pub fn min_path_sum(mut grid: Vec<Vec<i32>>) -> i32 {
        // The grid doubles as the DP table: after the scan, grid[i][j] holds
        // not the cell's own value but the cheapest path sum from (0, 0)
        // reaching it, so no second table is ever allocated.
        let m = grid.len();
        let n = grid[0].len();
        // The first row and the first column have a single predecessor each,
        // so their running sums are plain prefixes along that row/column.
        for j in 1..n {
            grid[0][j] += grid[0][j - 1];
        }
        for i in 1..m {
            grid[i][0] += grid[i - 1][0];
            for j in 1..n {
                // Cheapest sum ending at (i, j) = the cell's own value plus
                // the smaller of the sums already sitting above and left.
                grid[i][j] += grid[i - 1][j].min(grid[i][j - 1]);
            }
        }
        grid[m - 1][n - 1]
    }
}
