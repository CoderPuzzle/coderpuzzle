use std::collections::HashMap;

impl Solution {
    pub fn maximum_subarray_sum(nums: Vec<i32>, k: i32) -> i64 {
        let k = k as usize;
        // counts maps value -> frequency in the current window; zero-count
        // keys are removed so counts.len() is the window's distinct count.
        let mut counts: HashMap<i32, usize> = HashMap::new();
        let mut window_sum: i64 = 0;
        let mut best: i64 = 0;
        for i in 0..nums.len() {
            let value = nums[i];
            *counts.entry(value).or_insert(0) += 1;
            window_sum += value as i64;
            // Retire nums[i-k] BEFORE evaluating, so exactly k members
            // are in the window at each check.
            if i >= k {
                let old = nums[i - k];
                let c = counts.get_mut(&old).unwrap();
                if *c == 1 {
                    counts.remove(&old);
                } else {
                    *c -= 1;
                }
                window_sum -= old as i64;
            }
            // k slots holding k distinct values means no repeats.
            if i + 1 >= k && counts.len() == k && window_sum > best {
                best = window_sum;
            }
        }
        best
    }
}
