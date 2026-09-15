class Solution {

    public int minSpaceWastedKResizing(int[] nums, int k) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // g[i][j] = waste if a single allocation covers nums[i..j]
        long[][] g = new long[n][n];
        for (int i = 0; i < n; i++) {
            long mx = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] > mx) mx = nums[j];
                g[i][j] = mx * (j - i + 1) - (prefix[j + 1] - prefix[i]);
            }
        }
        final long INF = Long.MAX_VALUE / 4;
        // dp[j][i] = min waste for suffix starting at i using j segments
        long[][] dp = new long[k + 2][n + 1];
        for (int j = 0; j < k + 2; j++) {
            java.util.Arrays.fill(dp[j], INF);
        }
        dp[0][n] = 0;
        for (int j = 1; j < k + 2; j++) {
            for (int i = n - 1; i >= 0; i--) {
                long best = INF;
                for (int t = i; t < n; t++) {
                    if (dp[j - 1][t + 1] < INF) {
                        long cand = g[i][t] + dp[j - 1][t + 1];
                        if (cand < best) best = cand;
                    }
                }
                dp[j][i] = best;
            }
        }
        return (int) dp[k + 1][0];
    }
}
