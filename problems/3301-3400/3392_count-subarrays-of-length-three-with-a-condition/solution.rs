impl Solution {
    pub fn count_subarrays(nums: Vec<i32>) -> i32 {
        // The window at i qualifies when nums[i] + nums[i + 2] equals
        // exactly half of nums[i + 1]. Cross-multiplying keeps the test
        // in integers: twice the pair sum equals the middle value, and
        // an odd middle value can never pass.
        let mut count = 0;
        for i in 0..nums.len().saturating_sub(2) {
            if 2 * (nums[i] + nums[i + 2]) == nums[i + 1] {
                count += 1;
            }
        }
        count
    }
}
