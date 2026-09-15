impl Solution {
    // dp[i][j] ends as the order of the largest plus centered at (i, j):
    // every cell starts uncapped at n, mines drop to 0, then four
    // directional sweeps cap it by the run of consecutive 1's that way.
    pub fn order_of_largest_plus_sign(n: i32, mines: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut dp = vec![vec![n as i32; n]; n];
        for mine in &mines {
            dp[mine[0] as usize][mine[1] as usize] = 0;
        }
        for i in 0..n {
            let mut run = 0;
            for j in 0..n {
                run = if dp[i][j] > 0 { run + 1 } else { 0 };
                if run < dp[i][j] {
                    dp[i][j] = run;
                }
            }
            run = 0;
            for j in (0..n).rev() {
                run = if dp[i][j] > 0 { run + 1 } else { 0 };
                if run < dp[i][j] {
                    dp[i][j] = run;
                }
            }
        }
        for j in 0..n {
            let mut run = 0;
            for i in 0..n {
                run = if dp[i][j] > 0 { run + 1 } else { 0 };
                if run < dp[i][j] {
                    dp[i][j] = run;
                }
            }
            run = 0;
            for i in (0..n).rev() {
                run = if dp[i][j] > 0 { run + 1 } else { 0 };
                if run < dp[i][j] {
                    dp[i][j] = run;
                }
            }
        }
        let mut best = 0;
        for row in &dp {
            for &value in row {
                best = best.max(value);
            }
        }
        best
    }
}
