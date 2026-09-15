impl Solution {
    pub fn maximum_triplet_value(nums: Vec<i32>) -> i64 {
        // One pass with two running prefix maxima: while treating the
        // current element as k, best_diff already holds the largest
        // nums[i] - nums[j] over i < j before it, so extending that best
        // pair by nums[k] covers every triplet ending here without ever
        // re-scanning the prefix.  The answer is bounded by
        // (10^6 - 1) * 10^6, which is why it rides in an i64.
        let mut best: i64 = 0; // all-negative answers collapse to 0
        let mut best_diff: i64 = 0; // max nums[i] - nums[j] over pairs passed
        let mut max_prefix: i64 = 0; // max nums[i] over indices passed
        for &x in &nums {
            let v = x as i64;
            best = best.max(best_diff * v);
            best_diff = best_diff.max(max_prefix - v);
            max_prefix = max_prefix.max(v);
        }
        best
    }
}
