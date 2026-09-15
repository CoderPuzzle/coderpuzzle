impl Solution {
    pub fn number_of_paths(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let m = grid.len();
        let n = grid[0].len();
        let k = k as usize;
        // dp[j][v] = paths reaching column j whose sum is v (mod k). When
        // cell (i, j) is computed, dp[j] still holds the row above and
        // dp[j-1] already holds the current row's left neighbor.
        let mut dp: Vec<Option<Vec<i64>>> = vec![None; n];
        for i in 0..m {
            for j in 0..n {
                let g = ((grid[i][j] as i64) % (k as i64) + k as i64) as usize % k;
                if i == 0 && j == 0 {
                    // Seed: the single corner path has remainder g.
                    let mut first = vec![0i64; k];
                    first[g] = 1;
                    dp[j] = Some(first);
                    continue;
                }
                let mut cur = vec![0i64; k];
                // A path arriving with remainder r leaves with (r + g) % k,
                // so target v pulls from incoming (v - g) mod k.
                if i > 0 {
                    if let Some(above) = &dp[j] {
                        for v in 0..k {
                            let src = (v + k - g) % k;
                            cur[v] = above[src];
                        }
                    }
                }
                if j > 0 {
                    if let Some(left) = &dp[j - 1] {
                        for v in 0..k {
                            let src = (v + k - g) % k;
                            cur[v] = (cur[v] + left[src]) % MOD;
                        }
                    }
                }
                dp[j] = Some(cur);
            }
        }
        // Answer = remainder-0 paths reaching the bottom-right cell.
        (dp[n - 1].as_ref().unwrap()[0] % MOD) as i32
    }
}
