impl Solution {
    pub fn max_value_after_reverse(nums: Vec<i32>) -> i32 {
        // Reversing [L, R] only rewires the two boundary links. Gains split
        // into: prefix/suffix reversals (one boundary term each) and interior
        // reversals, bounded by 2*(max adjacent min - min adjacent max).
        let n = nums.len();
        let mut total: i64 = 0;
        for i in 0..n - 1 {
            total += (nums[i] - nums[i + 1]).abs() as i64;
        }
        let mut best_gain: i64 = 0;
        let mut big: i64 = i64::MIN; // max over adjacent-pair minima
        let mut small: i64 = i64::MAX; // min over adjacent-pair maxima
        for i in 0..n - 1 {
            let (a, b) = (nums[i], nums[i + 1]);
            // reverse [0..i]: the (i, i+1) link becomes (0, i+1)
            let gain_prefix = (nums[0] - b).abs() as i64 - (a - b).abs() as i64;
            best_gain = best_gain.max(gain_prefix);
            // reverse [i+1..n-1]: the (i, i+1) link becomes (i, n-1)
            let gain_suffix = (nums[n - 1] - a).abs() as i64 - (a - b).abs() as i64;
            best_gain = best_gain.max(gain_suffix);
            big = big.max(a.min(b) as i64);
            small = small.min(a.max(b) as i64);
        }
        if big > small {
            best_gain = best_gain.max(2 * (big - small));
        }
        // The statement guarantees the answer fits in 32 bits.
        (total + best_gain) as i32
    }
}
