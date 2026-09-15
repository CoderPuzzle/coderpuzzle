class Solution {

    public int numberOfPaths(int[][] grid, int k) {
        final int MOD = 1000000007;
        int m = grid.length;
        int n = grid[0].length;
        // dp[j][v] = paths reaching column j whose sum is v (mod k). When
        // cell (i, j) is computed, dp[j] still holds the row above and
        // dp[j-1] already holds the current row's left neighbor.
        long[][] dp = new long[n][k];
        boolean[] alive = new boolean[n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int g = ((grid[i][j] % k) + k) % k;
                if (i == 0 && j == 0) {
                    // Seed: the single corner path has remainder g.
                    java.util.Arrays.fill(dp[j], 0L);
                    dp[j][g] = 1;
                    alive[j] = true;
                    continue;
                }
                long[] cur = new long[k];
                // A path arriving with remainder r leaves with (r + g) % k,
                // so target v pulls from incoming (v - g) mod k.
                if (i > 0 && alive[j]) {
                    long[] above = dp[j];
                    for (int v = 0; v < k; v++) {
                        int src = (((v - g) % k) + k) % k;
                        cur[v] = above[src];
                    }
                }
                if (j > 0 && alive[j - 1]) {
                    long[] left = dp[j - 1];
                    for (int v = 0; v < k; v++) {
                        int src = (((v - g) % k) + k) % k;
                        cur[v] = (cur[v] + left[src]) % MOD;
                    }
                }
                dp[j] = cur;
                alive[j] = true;
            }
        }
        // Answer = remainder-0 paths reaching the bottom-right cell.
        return (int) (dp[n - 1][0] % MOD);
    }
}
