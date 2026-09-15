impl Solution {
    pub fn maximum_jumps(nums: Vec<i32>, target: i32) -> i32 {
        // dp[j] = max jumps to reach j (-1 = unreachable). Every edge i -> j
        // has i < j, so the jump graph is a DAG in index order and one
        // ascending sweep relaxes every edge exactly once.
        let n = nums.len();
        let mut dp = vec![-1i32; n];
        dp[0] = 0;
        for j in 1..n {
            let mut best = -1i32;
            for i in 0..j {
                if dp[i] == -1 {
                    continue;
                }
                // Widen before subtracting: the gap can reach +-2e9, the very
                // edge of the i32 range under the stated constraints.
                let diff = nums[j] as i64 - nums[i] as i64;
                let limit = target as i64;
                if diff >= -limit && diff <= limit && dp[i] + 1 > best {
                    best = dp[i] + 1;
                }
            }
            dp[j] = best;
        }
        dp[n - 1]
    }
}
