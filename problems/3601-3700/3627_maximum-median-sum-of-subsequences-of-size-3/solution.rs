impl Solution {
    pub fn maximum_median_sum(mut nums: Vec<i32>) -> i64 {
        // Sorted descending, the optimal play pairs the two largest
        // remaining values with the smallest remaining one: the largest
        // is sacrificed every step (it can only be a median of a triple
        // that contains an even larger element, which is impossible to
        // arrange for all of them), so spending it on deleting the
        // smallest leftover is free. Step t therefore consumes s[2t],
        // s[2t + 1] and the t-th smallest value s[n - 1 - t], making the
        // medians the odd indices 1, 3, 5, ... -- the first n/3 of them.
        // The sum reaches ~1.7e14, past 32 bits, so i64 math is
        // required.
        nums.sort_unstable_by(|a, b| b.cmp(a));
        let bound = 2 * (nums.len() / 3);
        nums[1..bound].iter().step_by(2).map(|&v| v as i64).sum()
    }
}
