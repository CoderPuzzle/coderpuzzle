use std::collections::HashSet;

impl Solution {
    pub fn longest_consecutive(nums: Vec<i32>) -> i32 {
        // The set collapses duplicates and makes membership an O(1) test.
        let values: HashSet<i64> = nums.iter().map(|&value| value as i64).collect();
        let mut best: i32 = 0;
        for &value in &values {
            // Only a true run start (no value - 1 present) triggers a walk;
            // each maximal run has exactly one such start, which keeps the
            // nested loop linear: every element is touched at most twice.
            if !values.contains(&(value - 1)) {
                let mut length: i64 = 1;
                // Walk upward through the run without sorting anything.
                while values.contains(&(value + length)) {
                    length += 1;
                }
                best = best.max(length as i32);
            }
        }
        best
    }
}
