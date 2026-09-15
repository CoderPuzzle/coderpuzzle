use std::collections::HashSet;

impl Solution {
    pub fn distinct_averages(nums: Vec<i32>) -> i32 {
        // Sort, then pair the i-th smallest with the i-th largest. The
        // average (a + b) / 2 is distinct exactly when the sum a + b is
        // distinct, so track pair sums and never touch floats.
        let mut ordered = nums;
        ordered.sort_unstable();
        let n = ordered.len();
        let mut sums = HashSet::new();
        for i in 0..n / 2 {
            sums.insert(ordered[i] + ordered[n - 1 - i]);
        }
        sums.len() as i32
    }
}
