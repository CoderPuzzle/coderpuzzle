impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i32 {
        // Seed with the first element so a single-element array returns itself.
        let mut best = nums[0];
        // Extremes of subarray products ending exactly at the current index;
        // the minimum must be carried too because a negative factor reverses
        // the order and can turn the worst product into the next best.
        let mut cur_max = nums[0];
        let mut cur_min = nums[0];
        for &value in &nums[1..] {
            // A negative incoming value swaps the extremes so the usual
            // candidate rules apply unchanged.
            if value < 0 {
                std::mem::swap(&mut cur_max, &mut cur_min);
            }
            // Either start a fresh subarray at this value or extend.
            cur_max = value.max(cur_max * value);
            cur_min = value.min(cur_min * value);
            best = best.max(cur_max);
        }
        best
    }
}
