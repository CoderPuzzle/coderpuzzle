impl Solution {
    pub fn maximum_score(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        // The running prefix sum reaches n * 10^9 = 10^14, well past 32
        // bits, so it accumulates in a 64-bit integer even though each
        // element fits.
        let total: i64 = nums.iter().map(|&v| v as i64).sum();
        // Sweep the split indices right to left carrying two running views:
        // p holds prefixSum(i) and suffix_min holds the minimum of
        // nums[i + 1..n - 1]. The last valid split seeds the answer.
        let mut p = total - nums[n - 1] as i64;
        let mut suffix_min = nums[n - 1];
        let mut best = p - suffix_min as i64;
        for i in (0..n - 2).rev() {
            // Moving to split i folds nums[i + 1] into both views.
            suffix_min = suffix_min.min(nums[i + 1]);
            p -= nums[i + 1] as i64;
            let score = p - suffix_min as i64;
            if score > best {
                best = score;
            }
        }
        best
    }
}
