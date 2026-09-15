impl Solution {
    pub fn max_rotate_function(nums: Vec<i32>) -> i32 {
        let n = nums.len() as i32;
        let total: i32 = nums.iter().sum();
        // F(0) weights each element by its index; every later rotation follows
        // from the recurrence, so only the running value is kept.
        let mut current: i32 = nums.iter().enumerate().map(|(i, v)| i as i32 * v).sum();
        let mut best = current;
        for k in 1..n {
            // One more rotation promotes every element's weight by 1 and
            // demotes nums[n-k] from weight n-1 to weight 0.
            current += total - n * nums[(n - k) as usize];
            best = best.max(current);
        }
        best
    }
}
