impl Solution {
    pub fn find_valid_elements(nums: Vec<i32>) -> Vec<i32> {
        let mut left_max = nums.clone();
        for i in 1..nums.len() {
            left_max[i] = left_max[i - 1].max(nums[i]);
        }
        let mut right_max = nums.clone();
        for i in (0..nums.len() - 1).rev() {
            right_max[i] = right_max[i + 1].max(nums[i]);
        }

        nums.iter()
            .enumerate()
            .filter_map(|(i, &value)| {
                (i == 0 || i == nums.len() - 1 || value > left_max[i - 1] || value > right_max[i + 1]).then_some(value)
            })
            .collect()
    }
}
