impl Solution {
    pub fn maximum_product(nums: Vec<i32>, m: i32) -> i64 {
        // A size-m subsequence with first index i and last index j
        // exists iff j >= i + m - 1. For m == 1 first and last are the
        // same element, so the answer is the best square. Otherwise
        // sweep i downward: the eligible window nums[i + m - 1:] grows
        // by one entry per step, so its max and min update in O(1), and
        // one of those two extremes is always the best partner for
        // nums[i]. Products reach 1e5 * 1e5, so i64 math is required.
        let n = nums.len();
        let m = m as usize;
        if m == 1 {
            let mut best = i64::MIN;
            for &v in &nums {
                best = best.max(v as i64 * v as i64);
            }
            return best;
        }
        let mut smax = nums[n - 1] as i64;
        let mut smin = smax;
        let mut best = nums[n - m] as i64 * nums[n - 1] as i64;
        for i in (0..n - m).rev() {
            let v = nums[i + m - 1] as i64;
            if v > smax {
                smax = v;
            } else if v < smin {
                smin = v;
            }
            best = best.max(nums[i] as i64 * smax).max(nums[i] as i64 * smin);
        }
        best
    }
}
