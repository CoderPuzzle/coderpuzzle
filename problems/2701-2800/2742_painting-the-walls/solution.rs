impl Solution {
    pub fn paint_walls(cost: Vec<i32>, time: Vec<i32>) -> i32 {
        let n = cost.len();
        let inf = i64::MAX / 2;
        // Paying for wall i covers time[i] + 1 walls — itself plus time[i]
        // the free painter paints meanwhile — so a paid set succeeds iff its
        // weights sum to >= n. dp[j]: cheapest selection covering at least j
        // walls' worth of demand.
        let mut dp = vec![inf; n + 1];
        dp[0] = 0;
        for i in 0..n {
            let weight = (time[i] + 1) as usize;
            let c = cost[i] as i64;
            // Descending j keeps each wall used at most once (0/1 knapsack);
            // the clamp folds surplus coverage back to the dp[0] origin,
            // sound because coverage beyond n is worthless.
            for j in (1..=n).rev() {
                let src = if j >= weight { j - weight } else { 0 };
                let cand = dp[src] + c;
                if cand < dp[j] {
                    dp[j] = cand;
                }
            }
        }
        dp[n] as i32
    }
}
