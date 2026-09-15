use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn count_complete_subarrays(nums: Vec<i32>) -> i32 {
        let values: HashSet<i32> = nums.iter().copied().collect();
        let total_distinct = values.len();
        // A subarray is complete exactly when it holds every distinct value
        // of the whole array: atMost(k) counts it, atMost(k - 1) does not.
        Self::at_most_distinct(&nums, total_distinct) - Self::at_most_distinct(&nums, total_distinct - 1)
    }

    // Number of subarrays holding at most `limit` distinct values, counted by
    // right endpoint with a forward-only left boundary.
    fn at_most_distinct(nums: &[i32], limit: usize) -> i32 {
        let mut freq: HashMap<i32, i32> = HashMap::new();
        let mut distinct = 0usize;
        let mut left = 0usize;
        let mut count = 0i32;
        for right in 0..nums.len() {
            let grown = freq.entry(nums[right]).or_insert(0);
            *grown += 1;
            if *grown == 1 {
                distinct += 1;
            }
            while distinct > limit {
                let shrunk = freq.get_mut(&nums[left]).unwrap();
                *shrunk -= 1;
                if *shrunk == 0 {
                    distinct -= 1;
                }
                left += 1;
            }
            // every start in [left, right] keeps the window within limit
            // (limit 0 shrinks every window empty, contributing nothing)
            count += (right - left + 1) as i32;
        }
        count
    }
}
