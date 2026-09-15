impl Solution {
    pub fn move_zeroes(nums: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        // Invariant: nums[..slow] is the stabilized prefix of non-zero values
        // in their original order; nums[slow..fast] holds only zeros.
        let mut slow = 0;
        for fast in 0..nums.len() {
            if nums[fast] != 0 {
                // Swap the non-zero into its slot. While slow == fast (no
                // zeros seen yet) this is a self-exchange, so each element
                // moves at most once.
                nums.swap(slow, fast);
                slow += 1;
            }
        }
        nums
    }
}
