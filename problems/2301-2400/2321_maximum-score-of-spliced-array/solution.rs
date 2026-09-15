impl Solution {
    // A swap moves a contiguous block of difference between the arrays:
    // sum(nums1) changes by the range sum of nums2[i] - nums1[i], and
    // sum(nums2) by the negated amount. Each side's best outcome is its
    // base sum plus a maximum subarray of that difference array. Every
    // total stays in i32 range: even one array absorbing everything caps
    // at sum(nums1) + sum(nums2) <= 2 * 10^9 < 2^31 - 1.
    pub fn maximums_spliced_array(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        // Kadane clamped at 0 covers "not do anything" for free.
        let spliced_best = |base: &[i32], other: &[i32]| -> i32 {
            let mut base_sum = 0_i32;
            let mut best_gain = 0_i32;
            let mut current = 0_i32;
            for i in 0..base.len() {
                base_sum += base[i];
                let difference = other[i] - base[i];
                current = difference.max(current + difference);
                best_gain = best_gain.max(current);
            }
            base_sum + best_gain
        };
        spliced_best(&nums1, &nums2).max(spliced_best(&nums2, &nums1))
    }
}
