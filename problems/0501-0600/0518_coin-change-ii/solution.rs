impl Solution {
    pub fn change(amount: i32, coins: Vec<i32>) -> i32 {
        let amount = amount as usize;
        // dp[a] = number of combinations summing exactly to a; dp[0] = 1
        // is the empty combination.
        let mut dp = vec![0i32; amount + 1];
        dp[0] = 1;
        // Coins outer, amounts inner: each multiset is built in one fixed
        // coin order, so combinations are counted once (reversed loops
        // would count permutations instead).
        for &c in &coins {
            let c = c as usize;
            // Ascending reads dp[a - c] already updated for this coin —
            // exactly what lets a denomination repeat (unbounded knapsack).
            for a in c..=amount {
                dp[a] += dp[a - c];
            }
        }
        dp[amount]
    }
}
