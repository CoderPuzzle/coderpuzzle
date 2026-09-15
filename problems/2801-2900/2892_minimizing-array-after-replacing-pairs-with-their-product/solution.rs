impl Solution {
    pub fn min_array_length(nums: Vec<i32>, k: i32) -> i32 {
        // A zero merges with anything (0 * y = 0 <= k), so it drags the
        // whole array down to a single element.
        if nums.iter().any(|&v| v == 0) {
            return 1;
        }
        // Merge adjacent ones (1 * 1 = 1 <= k) so no two neighbors are
        // both 1; every remaining pair then multiplies to at least 2,
        // which bounds each backward scan by 2 * log2(k).
        let mut b: Vec<i32> = Vec::with_capacity(nums.len());
        for &v in &nums {
            if v != 1 || b.last() != Some(&1) {
                b.push(v);
            }
        }
        let m = b.len();
        let mut dp = vec![0i32; m + 1];
        for i in 1..=m {
            dp[i] = dp[i - 1] + 1;
            // Walk left multiplying while the merged product stays <= k:
            // each surviving j is the block b[j-1..i-1] merged to one
            // spot. Products reach k * 1e9, so the product is i64.
            let mut prod: i64 = 1;
            for j in (1..=i).rev() {
                prod *= b[j - 1] as i64;
                if prod > k as i64 {
                    break;
                }
                dp[i] = dp[i].min(dp[j - 1] + 1);
            }
        }
        dp[m]
    }
}
