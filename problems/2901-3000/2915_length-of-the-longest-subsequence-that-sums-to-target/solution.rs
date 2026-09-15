impl Solution {
    pub fn length_of_longest_subsequence(nums: Vec<i32>, target: i32) -> i32 {
        // dp[s] holds the longest subsequence length that sums exactly to s,
        // or -1 when s is unreachable. Sums never exceed target <= 1000, so
        // one flat array carries the whole state.
        let target = target as usize;
        let mut dp = vec![-1i32; target + 1];
        dp[0] = 0;
        for num in nums {
            let num = num as usize;
            // Walk s downward so each element contributes at most once
            // (0-1 knapsack, not unbounded).
            for s in (num..=target).rev() {
                if dp[s - num] != -1 && dp[s - num] + 1 > dp[s] {
                    dp[s] = dp[s - num] + 1;
                }
            }
        }
        dp[target]
    }
}
