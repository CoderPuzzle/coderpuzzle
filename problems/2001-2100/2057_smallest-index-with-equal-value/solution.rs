impl Solution {
    pub fn smallest_equal(nums: Vec<i32>) -> i32 {
        for (index, &value) in nums.iter().enumerate() {
            if index % 10 == value as usize {
                return index as i32;
            }
        }
        -1
    }
}
