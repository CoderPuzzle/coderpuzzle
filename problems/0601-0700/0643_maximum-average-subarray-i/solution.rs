impl Solution {
    pub fn find_max_average(nums: Vec<i32>, k: i32) -> f64 {
        // Every window has length k, so the best average is the best window
        // sum divided by k once at the end: keep the sum in an exact integer
        // and let the single division decide precision.
        let k = k as usize;
        let mut window: i64 = nums[..k].iter().map(|&value| value as i64).sum();
        let mut best = window;
        for index in k..nums.len() {
            window += nums[index] as i64 - nums[index - k] as i64;
            if window > best {
                best = window;
            }
        }
        best as f64 / k as f64
    }
}
