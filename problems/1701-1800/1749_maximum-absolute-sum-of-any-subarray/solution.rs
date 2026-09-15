impl Solution {
    pub fn max_absolute_sum(nums: Vec<i32>) -> i32 {
        // The max of |subarray sum| is realized at one of the two
        // extremes: the max subarray sum or the negated min subarray
        // sum. Track both running extremes in one sweep, each starting
        // fresh whenever extending the run would only hurt it.
        let (mut best, mut worst) = (0i64, 0i64);
        let (mut cur_max, mut cur_min) = (0i64, 0i64);
        for &v in &nums {
            cur_max = (cur_max + v as i64).max(v as i64);
            best = best.max(cur_max);
            cur_min = (cur_min + v as i64).min(v as i64);
            worst = worst.min(cur_min);
        }
        best.max(-worst) as i32
    }
}
