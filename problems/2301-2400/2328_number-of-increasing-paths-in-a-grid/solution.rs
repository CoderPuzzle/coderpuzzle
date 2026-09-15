impl Solution {
    pub fn count_paths(grid: Vec<Vec<i32>>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let m = grid.len();
        let n = grid[0].len();
        let mut cells: Vec<(i32, usize, usize)> = Vec::with_capacity(m * n);
        for i in 0..m {
            for j in 0..n {
                cells.push((grid[i][j], i, j));
            }
        }
        // Decreasing value order: when (i, j) is handled, every strictly
        // larger neighbor's dp entry is already final.
        cells.sort_by(|x, y| y.cmp(x));
        // dp[i][j] = number of increasing paths starting at (i, j);
        // 1 accounts for the length-1 path of the cell itself.
        let mut dp = vec![vec![1i64; n]; m];
        let dirs: [(isize, isize); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        for &(v, i, j) in &cells {
            for (di, dj) in dirs {
                let ni = i as isize + di;
                let nj = j as isize + dj;
                // Strict '>' skips equal values, so plateau cells never chain.
                if ni >= 0 && ni < m as isize && nj >= 0 && nj < n as isize && grid[ni as usize][nj as usize] > v {
                    dp[i][j] = (dp[i][j] + dp[ni as usize][nj as usize]) % MOD;
                }
            }
        }
        // A path is identified by its starting cell, so sum dp everywhere.
        let mut total = 0i64;
        for row in &dp {
            for &x in row {
                total = (total + x) % MOD;
            }
        }
        total as i32
    }
}
