impl Solution {
    pub fn max_frequency(nums: Vec<i32>, k: i32) -> i32 {
        // Operations only raise values, so an optimal equal-value group is a
        // contiguous window in sorted order, raised to its right end.
        let mut arr = nums.clone();
        arr.sort_unstable();
        let mut best: i64 = 1;
        let mut left = 0usize;
        let mut window_sum: i64 = 0;
        for right in 0..arr.len() {
            let value = arr[right] as i64;
            window_sum += value;
            // Cost = width * target - window sum, the increments needed to
            // lift everything to the right end; drop the smallest member
            // while the budget is exceeded.
            while (right as i64 - left as i64 + 1) * value - window_sum > k as i64 {
                window_sum -= arr[left] as i64;
                left += 1;
            }
            // Once a length is affordable, every shorter window is too.
            best = best.max(right as i64 - left as i64 + 1);
        }
        best as i32
    }
}
