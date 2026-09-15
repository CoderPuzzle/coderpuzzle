impl Solution {
    pub fn move_zeroes(nums: Vec<i32>) -> Vec<i32> {
        let mut nums = nums;
        // Invariant: nums[..write] is the stabilized prefix of non-zero
        // values in their original order. write never passes the read
        // index, so copying forward cannot clobber an unread value.
        let mut write = 0;
        for index in 0..nums.len() {
            if nums[index] != 0 {
                nums[write] = nums[index];
                write += 1;
            }
        }
        // Slots from write onward are settled by decree rather than by
        // exchange: overwrite the whole tail with zeros.
        nums[write..].fill(0);
        nums
    }
}
