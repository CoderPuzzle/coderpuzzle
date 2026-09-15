impl Solution {
    pub fn three_sum_closest(nums: Vec<i32>, target: i32) -> i32 {
        // Sorting is what buys the two-pointer scan: past any index values
        // only grow, so a sum that is too small safely retires its low end
        // and a sum that is too large retires its high end.
        let mut nums = nums;
        nums.sort();
        let mut closest = nums[0] + nums[1] + nums[2];
        for i in 0..nums.len() - 2 {
            let (mut lo, mut hi) = (i + 1, nums.len() - 1);
            while lo < hi {
                let total = nums[i] + nums[lo] + nums[hi];
                // Distance zero cannot be beaten, so an exact hit returns
                // on the spot.
                if total == target {
                    return total;
                }
                if (total - target).abs() < (closest - target).abs() {
                    closest = total;
                }
                // Retire the end that pushed the sum to the wrong side:
                // sorted order makes every partner behind it further away.
                if total < target {
                    lo += 1;
                } else {
                    hi -= 1;
                }
            }
        }
        closest
    }
}
