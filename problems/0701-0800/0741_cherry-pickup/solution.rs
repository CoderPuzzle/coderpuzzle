impl Solution {
    pub fn cherry_pickup(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len() as i32;
        // dp[r1][r2]: best cherries with walker 1 at (r1, t-r1) and walker 2 at
        // (r2, t-r2) after t steps; -1 marks unreachable states.
        let mut dp = vec![vec![-1i32; n as usize]; n as usize];
        dp[0][0] = grid[0][0];
        for t in 1..=2 * n - 2 {
            let mut ndp = vec![vec![-1i32; n as usize]; n as usize];
            let lo = 0.max(t - n + 1);
            let hi = (n - 1).min(t);
            for r1 in lo..=hi {
                let c1 = t - r1;
                if grid[r1 as usize][c1 as usize] == -1 {
                    continue;
                }
                for r2 in r1..=hi {
                    let c2 = t - r2;
                    if grid[r2 as usize][c2 as usize] == -1 {
                        continue;
                    }
                    let mut best = -1;
                    for pr1 in (r1 - 1)..=r1 {
                        for pr2 in (r2 - 1)..=r2 {
                            if pr1 >= 0 && pr1 < n && pr2 >= 0 && pr2 < n {
                                best = best.max(dp[pr1 as usize][pr2 as usize]);
                            }
                        }
                    }
                    if best < 0 {
                        continue;
                    }
                    let gain =
                        grid[r1 as usize][c1 as usize] + if r1 != r2 { grid[r2 as usize][c2 as usize] } else { 0 };
                    ndp[r1 as usize][r2 as usize] = best + gain;
                }
            }
            dp = ndp;
        }
        dp[(n - 1) as usize][(n - 1) as usize].max(0)
    }
}
