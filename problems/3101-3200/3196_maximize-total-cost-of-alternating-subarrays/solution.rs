impl Solution {
    pub fn maximum_total_cost(nums: Vec<i32>) -> i64 {
        // Splitting is only ever worth it to make a negative element flip
        // sign, and a subarray forces alternating signs from its head — so
        // per element there are two states: it keeps its phase-plus sign
        // (free to continue or restart after a worst-so-far prefix) or it
        // rides in as negated, which requires the previous element to have
        // kept its sign. The seeds are exactly hint dp[1][*]; two rolling
        // variables carry the table. Sums fit comfortably in i64 since
        // sum |nums[i]| <= 10^14.
        if nums.len() == 1 {
            return nums[0] as i64;
        }
        let mut keep = nums[0] as i64 + nums[1] as i64;
        let mut flip = nums[0] as i64 - nums[1] as i64;
        for &x in &nums[2..] {
            let next_keep = keep.max(flip) + x as i64;
            flip = keep - x as i64;
            keep = next_keep;
        }
        keep.max(flip)
    }
}
