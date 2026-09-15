impl Solution {
    pub fn or_array(nums: Vec<i32>) -> Vec<i32> {
        (0..nums.len() - 1).map(|i| nums[i] | nums[i + 1]).collect()
    }
}
