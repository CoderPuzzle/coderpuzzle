impl Solution {
    // Totals reach ~2 * 10^10 on the largest inputs, so dp is i64.
    pub fn min_cost(m: i32, n: i32, wait_cost: Vec<Vec<i32>>) -> i64 {
        // Between two consecutive moves a path waits once, on the cell it is
        // leaving — never before the first move or after the last. dp[j] is
        // the cheapest cost of standing on (i, j), entry paid plus every
        // earlier departed cell's wait.
        let (m, n) = (m as usize, n as usize);
        let mut prev = vec![0i64; n];
        let mut dp = vec![0i64; n];
        // First row: reachable only from the left; entry cost is j + 1.
        dp[0] = 1;
        for j in 1..n {
            // The start's departure skips its wait; move 1 is immediate.
            let wait = if j == 1 { 0 } else { wait_cost[0][j - 1] as i64 };
            dp[j] = dp[j - 1] + wait + j as i64 + 1;
        }
        for i in 1..m {
            std::mem::swap(&mut prev, &mut dp);
            // First column: reachable only from above.
            let first = if i == 1 { 0 } else { wait_cost[i - 1][0] as i64 };
            dp[0] = prev[0] + first + i as i64 + 1;
            for j in 1..n {
                dp[j] = (prev[j] + wait_cost[i - 1][j] as i64).min(dp[j - 1] + wait_cost[i][j - 1] as i64)
                    + (i as i64 + 1) * (j as i64 + 1);
            }
        }
        dp[n - 1]
    }
}
