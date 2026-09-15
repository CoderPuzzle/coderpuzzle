impl Solution {
    // Every element fits in i32 and the answer never exceeds
    // nums.len() - 1 <= 10^5 - 1, so i32 arithmetic carries everything
    // here. What survives removal is a suffix, and a suffix is strictly
    // increasing exactly when none of its adjacent pairs violates the
    // order, so the best cut sits just past the LAST violating pair.
    pub fn minimum_prefix_length(nums: Vec<i32>) -> i32 {
        for i in (0..nums.len().saturating_sub(1)).rev() {
            if nums[i] >= nums[i + 1] {
                return (i + 1) as i32;
            }
        }
        0
    }
}
