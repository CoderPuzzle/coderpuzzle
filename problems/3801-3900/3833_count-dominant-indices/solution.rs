impl Solution {
    // Suffix sums stay within 99 * 100 = 9900 and cross-products within
    // 100 * 99 = 9900, so i32 arithmetic carries both without overflow.
    pub fn dominant_indices(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut count = 0i32;
        // Walk backward from the second-to-last index, carrying the sum of
        // the strict suffix after i; the comparison nums[i] > sum / (n - 1 - i)
        // is exactly nums[i] * (n - 1 - i) > sum in integer arithmetic.
        let mut suffix = 0i32;
        for i in (0..n - 1).rev() {
            suffix += nums[i + 1];
            if nums[i] * (n as i32 - 1 - i as i32) > suffix {
                count += 1;
            }
        }
        count
    }
}
