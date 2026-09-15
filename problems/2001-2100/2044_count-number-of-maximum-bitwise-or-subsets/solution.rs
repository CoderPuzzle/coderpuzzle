impl Solution {
    pub fn count_max_or_subsets(nums: Vec<i32>) -> i32 {
        fn count(nums: &[i32], index: usize, current: i32, maximum: i32) -> i32 {
            if index == nums.len() {
                return i32::from(current == maximum);
            }
            count(nums, index + 1, current, maximum) + count(nums, index + 1, current | nums[index], maximum)
        }

        let maximum = nums.iter().fold(0, |accumulator, &value| accumulator | value);
        count(&nums, 0, 0, maximum)
    }
}
