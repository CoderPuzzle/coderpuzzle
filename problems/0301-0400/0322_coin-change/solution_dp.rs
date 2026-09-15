impl Solution {
    pub fn coin_change(coins: Vec<i32>, amount: i32) -> i32 {
        let amount = amount as usize;
        // dp[a] = fewest coins for amount a; dp[0] = 0, every other amount
        // starts at inf = amount+1, which no real answer can reach.
        let inf = amount as i32 + 1;
        let mut dp = vec![inf; amount + 1];
        dp[0] = 0;
        // Amounts smallest-first, so dp[a - c] is already final when consulted.
        for a in 1..=amount {
            // Try every coin as the last one used: dp[a] = min(dp[a - c] + 1).
            for &c in &coins {
                let ca = c as usize;
                if ca <= a && dp[a - ca] + 1 < dp[a] {
                    dp[a] = dp[a - ca] + 1;
                }
            }
        }
        if dp[amount] == inf {
            -1
        } else {
            dp[amount]
        }
    }
}
