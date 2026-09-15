class Solution {

    public int numWays(int steps, int arrLen) {
        final int MOD = 1_000_000_007;
        // each move shifts the position by at most one, so only the window
        // min(arrLen, steps + 1) is reachable — cost is independent of a
        // huge arrLen
        int n = Math.min(arrLen, steps + 1);
        // dp[i] = number of ways to stand at position i after the moves
        // processed so far
        long[] dp = new long[n];
        dp[0] = 1;
        for (int s = 0; s < steps; s++) {
            long[] ndp = new long[n];
            for (int i = 0; i < n; i++) {
                // stay, or arrive from the left/right neighbor — both
                // guarded by the window bounds
                long total = dp[i];
                if (i > 0) total += dp[i - 1];
                if (i + 1 < n) total += dp[i + 1];
                ndp[i] = total % MOD;
            }
            dp = ndp;
        }
        // walks that return to the origin after exactly `steps` moves
        return (int) dp[0];
    }
}
