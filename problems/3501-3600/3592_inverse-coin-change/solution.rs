impl Solution {
    pub fn find_coins(num_ways: Vec<i32>) -> Vec<i32> {
        // numWays[i] only depends on coins <= i, so scanning amounts in
        // ascending order the coin set is forced: maintain dp = unbounded
        // knapsack way-counts over the coins confirmed so far (dp[0] = 1).
        // Every dp[s] counts multisets of coins summing to s <= n <= 100, so
        // it never exceeds p(100) = 190569292 and i32 is safe.
        let n = num_ways.len();
        let mut dp = vec![0i32; n + 1];
        dp[0] = 1;
        let mut coins: Vec<i32> = Vec::new();
        for i in 1..=n {
            let target = num_ways[i - 1];
            // If the counts already match, coin i cannot exist: adding it
            // would lift the count to dp[i] + 1.
            if dp[i] == target {
                continue;
            }
            // One short means coin i must exist: it contributes dp[0] = 1
            // extra way to amount i. Fold it into the running DP.
            if dp[i] + 1 != target {
                return Vec::new();
            }
            coins.push(i as i32);
            for s in i..=n {
                dp[s] += dp[s - i];
            }
        }
        coins
    }
}
