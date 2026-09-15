impl Solution {
    // Every round pairs the current minimum with the current maximum;
    // after sorting, those are exactly nums[k] and nums[n-1-k]. Sums stay
    // <= 100 — far inside i32 — and the single division by 2 at f64
    // precision is exact because every pair sum of integers in 1..50
    // equals an integer or an integer plus one half.
    pub fn minimum_average(mut nums: Vec<i32>) -> f64 {
        nums.sort_unstable();
        let n = nums.len();
        let mut best = f64::MAX;
        for k in 0..n / 2 {
            best = best.min((nums[k] + nums[n - 1 - k]) as f64 / 2.0);
        }
        best
    }
}
