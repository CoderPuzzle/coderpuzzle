impl Solution {
    pub fn maximum_triplet_value(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        // prefix_max[i] is the largest value at or before i, suffix_max[i] the
        // largest value at or after i, so any middle index j can look both ways.
        let mut prefix_max = vec![0i64; n];
        let mut suffix_max = vec![0i64; n];
        prefix_max[0] = nums[0] as i64;
        for i in 1..n {
            prefix_max[i] = prefix_max[i - 1].max(nums[i] as i64);
        }
        suffix_max[n - 1] = nums[n - 1] as i64;
        for i in (0..n - 1).rev() {
            suffix_max[i] = suffix_max[i + 1].max(nums[i] as i64);
        }

        // For a fixed middle j the best choice of i < j is prefix_max[j - 1]
        // and of k > j is suffix_max[j + 1]; the clamp keeps an all-negative
        // answer at 0. The product reaches ~10^12, past 32-bit range.
        let mut ans = 0i64;
        for j in 1..n - 1 {
            ans = ans.max((prefix_max[j - 1] - nums[j] as i64) * suffix_max[j + 1]);
        }
        ans
    }
}
