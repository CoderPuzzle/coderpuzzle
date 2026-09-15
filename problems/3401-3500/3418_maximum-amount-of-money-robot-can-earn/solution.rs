impl Solution {
    // dp[k][j]: best total reaching the current cell having used at most k
    // of the 2 neutralizations. Rows update in place (the left neighbor is
    // already fresh), so the cell above is snapshotted first.
    pub fn maximum_amount(coins: Vec<Vec<i32>>) -> i32 {
        const NEG: i32 = -1_000_000_000;
        let rows = coins.len();
        let cols = coins[0].len();
        let mut dp0 = vec![NEG; cols];
        let mut dp1 = vec![NEG; cols];
        let mut dp2 = vec![NEG; cols];
        for i in 0..rows {
            for j in 0..cols {
                let value = coins[i][j];
                if i == 0 && j == 0 {
                    dp0[0] = value;
                    dp1[0] = value.max(0);
                    dp2[0] = dp1[0];
                    continue;
                }
                let (up0, up1, up2) = (dp0[j], dp1[j], dp2[j]);
                let (left0, left1, left2) = if j > 0 {
                    (dp0[j - 1], dp1[j - 1], dp2[j - 1])
                } else {
                    (NEG, NEG, NEG)
                };
                let best0 = up0.max(left0);
                let best1 = up1.max(left1);
                let best2 = up2.max(left2);
                dp0[j] = best0 + value;
                // A neutralization (worth it only on a robber) adds 0 here
                // and enters from a neighbor's k-1 layer.
                if value < 0 {
                    dp1[j] = (best1 + value).max(best0);
                    dp2[j] = (best2 + value).max(best1);
                } else {
                    dp1[j] = best1 + value;
                    dp2[j] = best2 + value;
                }
            }
        }
        dp0[cols - 1].max(dp1[cols - 1]).max(dp2[cols - 1])
    }
}
