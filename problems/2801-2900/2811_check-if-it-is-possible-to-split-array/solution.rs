impl Solution {
    pub fn can_split_array(nums: Vec<i32>, m: i32) -> bool {
        // Lengths 1 and 2 reach singletons unconditionally. Beyond that, some
        // adjacent pair must sum to at least m: the last cut of any finishing
        // run frees a final two-element piece that was produced good, while
        // any qualifying pair stays glued as lone elements peel off the ends.
        if nums.len() <= 2 {
            return true;
        }
        for i in 1..nums.len() {
            if nums[i - 1] + nums[i] >= m {
                return true;
            }
        }
        false
    }
}
