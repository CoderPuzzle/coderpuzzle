use std::collections::HashSet;

impl Solution {
    // Suffixes of a distinct array stay distinct, so the surviving tail is
    // nums[j:] for the smallest j whose suffix is duplicate-free. Scanning
    // right-to-left, that j is one past the first value that repeats inside
    // the tail; each operation removes 3 front elements.
    pub fn minimum_operations(nums: Vec<i32>) -> i32 {
        let mut seen = HashSet::new();
        let mut j = 0;
        for i in (0..nums.len()).rev() {
            if !seen.insert(nums[i]) {
                j = i + 1;
                break;
            }
        }
        ((j + 2) / 3) as i32
    }
}
