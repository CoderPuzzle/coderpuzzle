impl Solution {
    pub fn max_consistent_columns(grid: Vec<Vec<i32>>, limit: i32) -> i32 {
        let rows = grid.len();
        let cols = grid[0].len();
        let mut compatible = vec![vec![false; cols]; cols];
        for a in 0..cols {
            for b in (a + 1)..cols {
                let mut ok = true;
                for r in 0..rows {
                    if (grid[r][b] - grid[r][a]).abs() > limit {
                        ok = false;
                        break;
                    }
                }
                compatible[a][b] = ok;
            }
        }

        let mut dp = vec![1; cols];
        let mut answer = 1;
        for j in 0..cols {
            for i in 0..j {
                if compatible[i][j] {
                    dp[j] = dp[j].max(dp[i] + 1);
                }
            }
            answer = answer.max(dp[j]);
        }
        answer as i32
    }
}
