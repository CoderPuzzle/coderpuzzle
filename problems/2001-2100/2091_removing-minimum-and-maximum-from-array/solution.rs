impl Solution {
    pub fn minimum_deletions(nums: Vec<i32>) -> i32 {
        let mut minimum_index = 0;
        let mut maximum_index = 0;
        for index in 1..nums.len() {
            if nums[index] < nums[minimum_index] {
                minimum_index = index;
            }
            if nums[index] > nums[maximum_index] {
                maximum_index = index;
            }
        }

        let left = minimum_index.min(maximum_index);
        let right = minimum_index.max(maximum_index);
        let length = nums.len();
        (right + 1).min(length - left).min(left + 1 + length - right) as i32
    }
}
