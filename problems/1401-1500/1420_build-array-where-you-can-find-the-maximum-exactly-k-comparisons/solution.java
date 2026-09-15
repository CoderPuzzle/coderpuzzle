class Solution {

    public int numOfArrays(int n, int m, int k) {
        final int MOD = 1000000007;
        if (k <= 0 || k > n || k > m) {
            return 0;
        }
        long[][] dp = new long[k + 1][m + 1];
        for (int j = 1; j <= m; j++) {
            dp[1][j] = 1;
        }
        for (int step = 2; step <= n; step++) {
            long[][] ndp = new long[k + 1][m + 1];
            for (int c = 1; c <= k; c++) {
                long[] prev = dp[c - 1];
                long[] pref = new long[m + 1];
                for (int j = 1; j <= m; j++) {
                    pref[j] = (pref[j - 1] + prev[j]) % MOD;
                }
                long[] cur = dp[c];
                long[] row = ndp[c];
                for (int j = 1; j <= m; j++) {
                    row[j] = (cur[j] * j + pref[j - 1]) % MOD;
                }
            }
            dp = ndp;
        }
        long total = 0;
        for (int j = 1; j <= m; j++) {
            total = (total + dp[k][j]) % MOD;
        }
        return (int) total;
    }
}
