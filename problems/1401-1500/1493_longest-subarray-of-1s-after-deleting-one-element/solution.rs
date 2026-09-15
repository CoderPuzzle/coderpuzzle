impl Solution {
    pub fn longest_subarray(nums: Vec<i32>) -> i32 {
        let mut best: i32 = 0;
        let mut left = 0usize;
        let mut zeros = 0i32;
        for (right, &value) in nums.iter().enumerate() {
            if value == 0 {
                zeros += 1;
            }
            while zeros > 1 {
                if nums[left] == 0 {
                    zeros -= 1;
                }
                left += 1;
            }
            best = best.max((right - left + 1) as i32);
        }
        // window includes the zero; deleting it costs one slot, but we must
        // delete exactly one element either way
        if zeros == 0 {
            return nums.len() as i32 - 1; // all ones, must still delete one
        }
        best - 1
    }
}
