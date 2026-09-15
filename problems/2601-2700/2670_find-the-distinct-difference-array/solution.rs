use std::collections::HashSet;

impl Solution {
    pub fn distinct_difference_array(nums: Vec<i32>) -> Vec<i32> {
        // One right-to-left pass records how many distinct values survive
        // after each index, then a left-to-right pass grows the prefix set,
        // so every answer is a single subtraction of two maintained counts.
        let n = nums.len();
        let mut suffix_distinct = vec![0usize; n];
        let mut seen = HashSet::new();
        for i in (0..n).rev() {
            // Visited values are exactly those right of i, so this records
            // the distinct count of nums[i + 1, ..., n - 1] itself.
            suffix_distinct[i] = seen.len();
            seen.insert(nums[i]);
        }
        let mut prefix_seen = HashSet::new();
        let mut result = Vec::with_capacity(n);
        for &value in nums.iter() {
            prefix_seen.insert(value);
            let index = result.len();
            result.push((prefix_seen.len() - suffix_distinct[index]) as i32);
        }
        result
    }
}
