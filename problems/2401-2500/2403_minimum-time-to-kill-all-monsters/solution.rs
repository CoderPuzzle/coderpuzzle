impl Solution {
    pub fn minimum_time(power: Vec<i32>) -> i64 {
        let n = power.len();
        let full = (1usize << n) - 1;
        let inf = 1i64 << 60;
        // dp[mask] = min days to have defeated exactly the set `mask`.
        // The state suffices because the daily gain depends only on
        // |mask| and mana resets after every kill.
        let mut dp = vec![inf; full + 1];
        dp[0] = 0;
        // Increasing numeric order is a valid evaluation order: setting a
        // bit always yields a strictly larger mask, so each state is final
        // before anything extends it.
        for mask in 0..=full {
            if dp[mask] >= inf {
                continue;
            }
            let gain = (mask.count_ones() as i64) + 1;
            for j in 0..n {
                if mask & (1 << j) == 0 {
                    // Days to bank >= power[j] mana at `gain` per day.
                    let days = (power[j] as i64 + gain - 1) / gain;
                    let nxt = mask | (1 << j);
                    if dp[mask] + days < dp[nxt] {
                        dp[nxt] = dp[mask] + days;
                    }
                }
            }
        }
        dp[full]
    }
}
