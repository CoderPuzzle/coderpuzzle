impl Solution {
    pub fn number_of_ways(n: i32, x: i32) -> i32 {
        // A set of unique bases is exactly a choice of which distinct xth
        // powers to take, each at most once -- a counting knapsack.
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let mut dp = vec![0i64; n + 1];
        dp[0] = 1;
        let mut base: i64 = 1;
        loop {
            let mut power: i64 = 1;
            for _ in 0..x {
                power *= base;
            }
            if power > n as i64 {
                break;
            }
            let power = power as usize;
            // Walking the sums downward reads dp[sum - power] at its
            // pre-power value, so no subset takes this power twice.
            for total in (power..=n).rev() {
                dp[total] = (dp[total] + dp[total - power]) % MOD;
            }
            base += 1;
        }
        dp[n] as i32
    }
}
