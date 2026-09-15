class Solution {

    public int numRollsToTarget(int n, int k, int target) {
        final int MOD = 1000000007;
        // dp[t]: ways for the dice processed so far to show sum t
        int[] dp = new int[target + 1];
        int[] ndp = new int[target + 1];
        // zero dice reach sum 0 in exactly one way
        dp[0] = 1;
        for (int d = 0; d < n; d++) {
            // fresh table per die: the transition must read only the
            // previous die's distribution, else one die could count twice
            java.util.Arrays.fill(ndp, 0);
            for (int t = 1; t <= target; t++) {
                long s = 0;
                // every face value f is a distinct outcome, so all faces are
                // summed; min(k, t) skips faces that overshoot the target
                int hi = Math.min(k, t);
                for (int f = 1; f <= hi; f++) {
                    s += dp[t - f];
                }
                ndp[t] = (int) (s % MOD);
            }
            int[] tmp = dp;
            dp = ndp;
            ndp = tmp;
        }
        // targets no die sequence reaches were never written, so read as 0
        return dp[target];
    }
}
