use std::collections::HashMap;

impl Solution {
    pub fn longest_subarray(nums: Vec<i32>, k: i32) -> i32 {
        // freq counts occurrences of each value inside the window; dup counts
        // how many values have been seen twice or more.
        let mut freq: HashMap<i32, i32> = HashMap::new();
        let (mut dup, mut left, mut best) = (0i32, 0usize, 0i32);
        for right in 0..nums.len() {
            *freq.entry(nums[right]).or_insert(0) += 1;
            if freq[&nums[right]] == 2 {
                dup += 1;
            }
            // Grow past k repeating values and the window must give ground
            // until one of them is fully evicted again.
            while dup > k {
                let count = freq.get_mut(&nums[left]).unwrap();
                *count -= 1;
                if *count == 1 {
                    dup -= 1;
                }
                left += 1;
            }
            best = best.max((right - left + 1) as i32);
        }
        best
    }
}
