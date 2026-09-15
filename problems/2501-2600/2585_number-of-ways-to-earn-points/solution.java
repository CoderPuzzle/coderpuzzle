class Solution {

    public int waysToReachTarget(int target, int[][] types) {
        // Bounded knapsack over score: dp[p] counts ways to hit exactly
        // p points with the types processed so far; each type opens a
        // fresh row so indistinguishable questions only contribute
        // take-counts q <= min(count, points / marks).
        final int MOD = 1_000_000_007;
        long[] dp = new long[target + 1];
        dp[0] = 1;
        for (int[] type : types) {
            int count = type[0],
                marks = type[1];
            long[] nxt = new long[target + 1];
            for (int points = 0; points <= target; ++points) {
                int maxTake = Math.min(count, points / marks);
                // <= 51 residues below 10^9+7 sum under 5.5 * 10^10,
                // far inside long range before the single reduction.
                long total = 0;
                for (int taken = 0; taken <= maxTake; ++taken) {
                    total += dp[points - taken * marks];
                }
                nxt[points] = total % MOD;
            }
            dp = nxt;
        }
        return (int) dp[target];
    }
}
