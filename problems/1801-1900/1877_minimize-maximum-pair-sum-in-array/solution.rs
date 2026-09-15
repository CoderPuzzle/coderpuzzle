impl Solution {
    // Pair sorted extremes: nums[i] with nums[n-1-i]. An exchange
    // argument shows this minimizes the largest pair sum.
    pub fn min_pair_sum(mut nums: Vec<i32>) -> i64 {
        nums.sort_unstable();
        let n = nums.len();
        let mut best = 0i64;
        for i in 0..n / 2 {
            best = best.max(nums[i] as i64 + nums[n - 1 - i] as i64);
        }
        best
    }
}
