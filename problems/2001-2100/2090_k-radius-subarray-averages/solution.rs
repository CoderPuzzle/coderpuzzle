impl Solution {
    pub fn get_averages(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let radius = k as usize;
        let width = 2 * radius + 1;
        let mut averages = vec![-1; nums.len()];
        if width > nums.len() {
            return averages;
        }

        let mut window_sum: i64 = nums[..width].iter().map(|&value| value as i64).sum();
        averages[radius] = (window_sum / width as i64) as i32;
        for center in radius + 1..nums.len() - radius {
            window_sum += nums[center + radius] as i64;
            window_sum -= nums[center - radius - 1] as i64;
            averages[center] = (window_sum / width as i64) as i32;
        }
        averages
    }
}
