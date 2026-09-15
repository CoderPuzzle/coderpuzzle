class Solution {

    public double probabilityOfHeads(double[] prob, int target) {
        // dp[c] = probability of exactly c heads among the coins so far;
        // zero heads is certain before any toss.
        double[] dp = new double[target + 1];
        dp[0] = 1.0;
        for (double p : prob) {
            // Each coin shifts probability between adjacent counts: the tails
            // branch keeps c, the heads branch arrives from c-1. Descending
            // keeps dp[c-1] at the previous coin's value (upward would let
            // one coin contribute two heads).
            for (int c = target; c > 0; c--) {
                dp[c] = dp[c] * (1 - p) + dp[c - 1] * p;
            }
            // Zero heads can only be reached by another tail.
            dp[0] *= 1 - p;
        }
        // Counts above target are never stored; dp[target] is exact.
        return dp[target];
    }
}
