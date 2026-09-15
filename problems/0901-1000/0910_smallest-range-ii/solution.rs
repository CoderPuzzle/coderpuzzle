impl Solution {
    pub fn smallest_range_ii(nums: Vec<i32>, k: i32) -> i32 {
        // Sorted, a best plan lifts a prefix by k and lowers the rest by k;
        // everyone moving together just keeps the raw span.
        let mut nums = nums;
        nums.sort();
        let n = nums.len();
        let mut best = nums[n - 1] - nums[0];
        for i in 1..n {
            // Cut after i elements: the extremes can only be the four
            // boundary values around the cut.
            let high = (nums[i - 1] + k).max(nums[n - 1] - k);
            let low = (nums[0] + k).min(nums[i] - k);
            best = best.min(high - low);
        }
        best
    }
}
