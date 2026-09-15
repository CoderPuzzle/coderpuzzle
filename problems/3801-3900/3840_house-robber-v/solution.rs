impl Solution {
    // Bounds: n <= 10^5 and nums[i] <= 10^5, so the rob-everything extreme
    // reaches 10^10 — everything lives comfortably in an i64.
    // prev1/prev2 carry dp[i-1]/dp[i-2]: the best haul from houses up to
    // i-1 / i-2. dp is monotone, so when colors differ the adjacent take
    // nums[i] + dp[i-1] dominates the non-adjacent nums[i] + dp[i-2].
    pub fn rob(nums: Vec<i32>, colors: Vec<i32>) -> i64 {
        let mut prev2 = 0i64;
        let mut prev1 = nums[0] as i64;
        for i in 1..nums.len() {
            let base = if colors[i] == colors[i - 1] { prev2 } else { prev1 };
            let take = nums[i] as i64 + base;
            let best = prev1.max(take);
            prev2 = prev1;
            prev1 = best;
        }
        prev1
    }
}
