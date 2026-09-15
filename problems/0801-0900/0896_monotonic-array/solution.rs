impl Solution {
    pub fn is_monotonic(nums: Vec<i32>) -> bool {
        // Two hypotheses survive until refuted: a rise kills the decreasing
        // one, a drop kills the increasing one, equals keep both standing.
        let mut increasing = true;
        let mut decreasing = true;
        for i in 1..nums.len() {
            if nums[i] > nums[i - 1] {
                decreasing = false;
            } else if nums[i] < nums[i - 1] {
                increasing = false;
            }
        }
        increasing || decreasing
    }
}
