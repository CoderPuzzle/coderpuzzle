impl Solution {
    pub fn build_array(nums: Vec<i32>) -> Vec<i32> {
        // One pass of nested indexing: nums is a permutation of 0..n-1, so
        // every value is itself a valid index and nums[nums[i]] is in range.
        nums.iter().map(|&x| nums[x as usize]).collect()
    }
}
