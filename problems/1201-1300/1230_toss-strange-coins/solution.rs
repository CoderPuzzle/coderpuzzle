impl Solution {
    pub fn probability_of_heads(prob: Vec<f64>, target: i32) -> f64 {
        let target = target as usize;
        // dp[c] = probability of exactly c heads among the coins so far;
        // zero heads is certain before any toss.
        let mut dp = vec![0.0f64; target + 1];
        dp[0] = 1.0;
        for &p in &prob {
            // Each coin shifts probability between adjacent counts: the tails
            // branch keeps c, the heads branch arrives from c-1. Descending
            // keeps dp[c-1] at the previous coin's value (upward would let
            // one coin contribute two heads).
            for c in (1..=target).rev() {
                dp[c] = dp[c] * (1.0 - p) + dp[c - 1] * p;
            }
            // Zero heads can only be reached by another tail.
            dp[0] *= 1.0 - p;
        }
        // Counts above target are never stored; dp[target] is exact.
        dp[target]
    }
}
