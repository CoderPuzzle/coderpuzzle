class Solution {

    public int beautifulPartitions(String s, int k, int minLength) {
        final long MOD = 1_000_000_007L;
        int n = s.length();
        long[][] dp = new long[n + 1][k + 1];
        dp[0][0] = 1;
        for (int j = 1; j <= k; j++) {
            long[] prefix = new long[n + 1];
            for (int x = 0; x < n; x++) {
                prefix[x + 1] = prefix[x];
                if (isPrimeDigit(s.charAt(x))) {
                    prefix[x + 1] += dp[x][j - 1];
                }
            }
            for (int i = 1; i <= n; i++) {
                if (isPrimeDigit(s.charAt(i - 1))) {
                    continue;
                }
                int hi = i - minLength;
                if (hi >= 0) {
                    dp[i][j] = prefix[hi + 1] % MOD;
                }
            }
        }
        return (int) (dp[n][k] % MOD);
    }

    private boolean isPrimeDigit(char ch) {
        return ch == '2' || ch == '3' || ch == '5' || ch == '7';
    }
}
