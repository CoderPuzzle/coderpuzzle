class Solution {

    public int paintWalls(int[] cost, int[] time) {
        int n = cost.length;
        final long INF = Long.MAX_VALUE / 2;
        // Paying for wall i covers time[i] + 1 walls — itself plus time[i]
        // the free painter paints meanwhile — so a paid set succeeds iff its
        // weights sum to >= n. dp[j]: cheapest selection covering at least j
        // walls' worth of demand.
        long[] dp = new long[n + 1];
        java.util.Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            int weight = time[i] + 1;
            long c = cost[i];
            // Descending j keeps each wall used at most once (0/1 knapsack);
            // the clamp folds surplus coverage back to the dp[0] origin,
            // sound because coverage beyond n is worthless.
            for (int j = n; j >= 1; j--) {
                int src = j >= weight ? j - weight : 0;
                long cand = dp[src] + c;
                if (cand < dp[j]) dp[j] = cand;
            }
        }
        return (int) dp[n];
    }
}
