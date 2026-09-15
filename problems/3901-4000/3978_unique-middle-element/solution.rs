impl Solution {
    pub fn is_middle_element_unique(nums: Vec<i32>) -> bool {
        let middle = nums[nums.len() / 2];
        nums.iter().filter(|&&value| value == middle).count() == 1
    }
}
