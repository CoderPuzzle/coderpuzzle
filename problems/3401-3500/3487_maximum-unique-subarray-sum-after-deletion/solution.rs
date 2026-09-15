use std::collections::HashSet;

impl Solution {
    // Deletions are free, so the chosen subarray is really a set of
    // distinct values: keep every positive value once, and when no
    // positive exists the best set is the single largest element.
    pub fn max_sum(nums: Vec<i32>) -> i32 {
        let mut seen = HashSet::new();
        let mut total = 0;
        let mut largest = nums[0];
        for &v in &nums {
            largest = largest.max(v);
            if v > 0 && seen.insert(v) {
                total += v;
            }
        }
        if seen.is_empty() {
            largest
        } else {
            total
        }
    }
}
