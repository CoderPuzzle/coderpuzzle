impl Solution {
    pub fn count_paths_with_xor_value(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let m = grid.len();
        let n = grid[0].len();
        // dp[i][j][x] = number of paths from (0,0) to (i,j) whose XOR is x
        let mut dp = vec![vec![[0i64; 16]; n]; m];
        dp[0][0][grid[0][0] as usize] = 1;
        for i in 0..m {
            for j in 0..n {
                if i == 0 && j == 0 {
                    continue;
                }
                let cell = grid[i][j];
                for x in 0..16usize {
                    let mut total: i64 = 0;
                    if i > 0 {
                        total += dp[i - 1][j][(x as i32 ^ cell) as usize];
                    }
                    if j > 0 {
                        total += dp[i][j - 1][(x as i32 ^ cell) as usize];
                    }
                    dp[i][j][x] = total % MOD;
                }
            }
        }
        dp[m - 1][n - 1][k as usize] as i32
    }
}
