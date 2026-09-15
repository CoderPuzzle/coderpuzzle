impl Solution {
    pub fn smallest_range_i(nums: Vec<i32>, k: i32) -> i32 {
        // Only the two ends matter: each element can travel at most k, so the
        // best plan lifts the minimum and lowers the maximum by k each.
        let mut low = nums[0];
        let mut high = nums[0];
        for &value in &nums[1..] {
            if value < low {
                low = value;
            } else if value > high {
                high = value;
            }
        }
        // The span shrinks by 2k at best and a score can never go below zero.
        (high - low - 2 * k).max(0)
    }
}
