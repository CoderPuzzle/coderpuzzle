use std::collections::HashSet;

impl Solution {
    pub fn missing_multiple(nums: Vec<i32>, k: i32) -> i32 {
        // The question is pure membership: drop every value into a hash
        // set, then walk the multiples of k upward until one is absent.
        let seen: HashSet<i32> = nums.into_iter().collect();
        let mut candidate = k;
        while seen.contains(&candidate) {
            candidate += k;
        }
        candidate
    }
}
