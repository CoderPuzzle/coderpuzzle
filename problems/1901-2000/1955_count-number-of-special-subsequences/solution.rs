impl Solution {
    pub fn count_special_subsequences(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // Over each prefix: f0 = all-zero subsequences, f1 = 0s-then-1s,
        // f2 = complete special subsequences. Each element updates exactly
        // one counter, and every special subsequence is built in one way.
        let (mut f0, mut f1, mut f2) = (0i64, 0i64, 0i64);
        for &x in &nums {
            // Every transition doubles (take the new element or skip it) and
            // adds an inflow from the previous stage; kept mod since the
            // true counts grow exponentially.
            if x == 0 {
                f0 = (f0 * 2 + 1) % MOD; // +1: the lone 0 starts a fresh one
            } else if x == 1 {
                // Appending this 1 to any f0 subsequence promotes it;
                // leading 1s are harmless while f0 is still zero.
                f1 = (f1 * 2 + f0) % MOD;
            } else {
                f2 = (f2 * 2 + f1) % MOD;
            }
        }
        f2 as i32
    }
}
