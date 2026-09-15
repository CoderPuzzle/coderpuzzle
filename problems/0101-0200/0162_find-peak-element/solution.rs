impl Solution {
    pub fn find_peak_element(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // Left-to-right scan stopping at the first descent — the direct way
        // to return the leftmost peak, which binary search cannot guarantee.
        for i in 0..n {
            // Positions just outside the array count as -infinity, so the
            // boundary checks pass vacuously at the ends.
            let left_ok = i == 0 || nums[i] > nums[i - 1];
            let right_ok = i == n - 1 || nums[i] > nums[i + 1];
            if left_ok && right_ok {
                return i as i32;
            }
        }
        // Unreachable: some peak always exists.
        -1
    }
}
