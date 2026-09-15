class Solution {

    public int mergeStones(int[] stones, int k) {
        int n = stones.length;
        // each merge replaces k piles with one (count drops by k - 1), so
        // reaching a single pile requires (k - 1) | (n - 1)
        if ((n - 1) % (k - 1) != 0) {
            return -1;
        }
        final int INF = Integer.MAX_VALUE;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + stones[i];
        }
        // dp[i][j][m] = min cost to compress stones[i..j] into exactly m piles
        long[][][] dp = new long[n][n][k + 1];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                java.util.Arrays.fill(dp[i][j], INF);
            }
        }
        // base: a single stone is already one pile at zero cost
        for (int i = 0; i < n; i++) {
            dp[i][i][1] = 0;
        }
        // increasing length, so every subinterval is final before it is used
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                // split: left part squeezed to one pile, right to m - 1;
                // any m-pile configuration has such a first-pile split
                for (int m = 2; m <= k; m++) {
                    for (int mid = i; mid < j; mid++) {
                        if (dp[i][mid][1] < INF && dp[mid + 1][j][m - 1] < INF) {
                            long cand = dp[i][mid][1] + dp[mid + 1][j][m - 1];
                            if (cand < dp[i][j][m]) {
                                dp[i][j][m] = cand;
                            }
                        }
                    }
                }
                // at k piles the interval merges into one pile for a cost
                // equal to its total stones (prefix sums answer in O(1))
                if (dp[i][j][k] < INF) {
                    dp[i][j][1] = dp[i][j][k] + prefix[j + 1] - prefix[i];
                }
            }
        }
        return dp[0][n - 1][1] < INF ? (int) dp[0][n - 1][1] : -1;
    }
}
