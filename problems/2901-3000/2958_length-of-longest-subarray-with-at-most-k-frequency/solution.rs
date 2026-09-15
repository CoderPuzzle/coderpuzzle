use std::collections::HashMap;

impl Solution {
    pub fn max_subarray_length(nums: Vec<i32>, k: i32) -> i32 {
        // Expand the window rightward; only the entering value can break
        // goodness (its own count crosses k), so shrink from the left
        // until one copy of it falls out. Every index enters and leaves
        // the window once, making the whole scan linear.
        let mut counts: HashMap<i32, i32> = HashMap::new();
        let mut best = 0i32;
        let mut left = 0usize;
        for (r, &v) in nums.iter().enumerate() {
            *counts.entry(v).or_insert(0) += 1;
            while counts[&v] > k {
                let w = nums[left];
                let c = counts.get_mut(&w).unwrap();
                *c -= 1;
                if *c == 0 {
                    counts.remove(&w);
                }
                left += 1;
            }
            best = best.max((r - left + 1) as i32);
        }
        best
    }
}
