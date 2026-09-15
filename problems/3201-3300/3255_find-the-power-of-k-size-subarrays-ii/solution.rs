impl Solution {
    pub fn results_array(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let n = nums.len();
        let width = k as usize;
        let mut results = vec![0; n - width + 1];
        let mut run = 1usize;
        for i in 0..n {
            if i > 0 && nums[i] == nums[i - 1] + 1 {
                run += 1;
            } else {
                run = 1;
            }
            if i + 1 >= width {
                results[i + 1 - width] = if run >= width { nums[i] } else { -1 };
            }
        }
        results
    }
}
