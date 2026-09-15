impl Solution {
    pub fn three_sum_smaller(nums: Vec<i32>, target: i32) -> i32 {
        // Sorting is what buys the two-pointer count: past any index values
        // only grow, so a pair sum that is still too large safely retires
        // its high end, and one that is small enough retires its low end
        // together with every partner behind it.
        let mut nums = nums;
        nums.sort();
        let n = nums.len();
        let mut count = 0;
        for i in 0..n.saturating_sub(2) {
            // The three smallest values still available already reach the
            // target: no pair works for this anchor, and sorted order makes
            // every later anchor no smaller, so the walk can stop outright.
            if nums[i] + nums[i + 1] + nums[i + 2] >= target {
                break;
            }
            let remaining = target - nums[i];
            let (mut lo, mut hi) = (i + 1, n - 1);
            while lo < hi {
                if nums[lo] + nums[hi] < remaining {
                    // Sorted order pairs this lo with every index up to hi
                    // at once: hi - lo counting triplets in a single step.
                    count += (hi - lo) as i32;
                    lo += 1;
                } else {
                    hi -= 1;
                }
            }
        }
        count
    }
}
