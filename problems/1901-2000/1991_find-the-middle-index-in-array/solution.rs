impl Solution {
    pub fn find_middle_index(nums: Vec<i32>) -> i32 {
        // Single pass with a running left sum: an index is a middle index
        // when left == total - left - nums[i] (the right side's sum).
        let total: i32 = nums.iter().sum();
        let mut left = 0;
        for (i, &x) in nums.iter().enumerate() {
            if left == total - left - x {
                return i as i32;
            }
            left += x;
        }
        -1
    }
}
