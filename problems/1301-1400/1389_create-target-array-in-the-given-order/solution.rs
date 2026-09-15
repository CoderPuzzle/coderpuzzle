impl Solution {
    pub fn create_target_array(nums: Vec<i32>, index: Vec<i32>) -> Vec<i32> {
        // Direct simulation: each step splices nums[i] into the growing
        // vector at position index[i], pushing the tail right. index[i] <= i
        // keeps every insertion inside the array built so far.
        let mut target: Vec<i32> = Vec::with_capacity(nums.len());
        for (value, position) in nums.iter().zip(index.iter()) {
            target.insert(*position as usize, *value);
        }
        target
    }
}
