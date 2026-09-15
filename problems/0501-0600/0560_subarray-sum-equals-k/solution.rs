use std::collections::HashMap;

impl Solution {
    pub fn subarray_sum(nums: Vec<i32>, k: i32) -> i32 {
        let mut prefix_counts: HashMap<i64, i64> = HashMap::new();
        // Seed with the empty prefix so subarrays starting at index 0 are counted.
        prefix_counts.insert(0, 1);
        let mut running: i64 = 0;
        let mut total: i64 = 0;
        for &value in &nums {
            running += value as i64;
            // Subarrays ending here sum to k exactly when an earlier prefix equals running - k.
            total += prefix_counts.get(&(running - k as i64)).copied().unwrap_or(0);
            // Record only after counting, so a subarray never matches against itself.
            *prefix_counts.entry(running).or_insert(0) += 1;
        }
        total as i32
    }
}
