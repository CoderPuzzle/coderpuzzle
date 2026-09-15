impl Solution {
    pub fn can_partition(nums: Vec<i32>) -> bool {
        let total: i64 = nums.iter().map(|&v| v as i64).sum();
        // An odd total cannot split into two equal halves.
        if total % 2 != 0 {
            return false;
        }
        let target = (total / 2) as usize;
        // dp[s]: some subset of the numbers processed so far sums to s.
        let mut dp = vec![false; target + 1];
        dp[0] = true;
        for &v in &nums {
            let v = v as usize;
            if v == 0 {
                continue;
            }
            // Sweep sums downward so v is used at most once (0/1 knapsack).
            for j in (v..=target).rev() {
                if dp[j - v] {
                    dp[j] = true;
                }
            }
            // Target reachable: the complement subset completes the split.
            if dp[target] {
                return true;
            }
        }
        dp[target]
    }
}
