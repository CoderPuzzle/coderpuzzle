impl Solution {
    pub fn min_sub_array_len(target: i32, nums: Vec<i32>) -> i32 {
        let n = nums.len();
        // Sentinel: an impossible length that survives when target is never met.
        let mut best = n + 1;
        let mut window: i64 = 0;
        let mut left = 0usize;
        for right in 0..n {
            window += nums[right] as i64;
            // Positive elements make the window sum monotone under both
            // pointer moves, so the smallest left end for each right only
            // moves rightward — both pointers make at most n steps.
            while window >= target as i64 {
                best = best.min(right - left + 1);
                // Shrink from the left to reach the minimal window ending
                // here and leave the leanest state for the next extension.
                window -= nums[left] as i64;
                left += 1;
            }
        }
        if best == n + 1 {
            0
        } else {
            best as i32
        }
    }
}
