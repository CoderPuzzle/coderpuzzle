impl Solution {
    pub fn min_swaps(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let ones = nums.iter().sum::<i32>() as usize;
        let mut window_ones = nums[..ones].iter().sum::<i32>();
        let mut best = window_ones;
        for start in 1..n {
            window_ones -= nums[start - 1];
            window_ones += nums[(start + ones - 1) % n];
            best = best.max(window_ones);
        }
        ones as i32 - best
    }
}
