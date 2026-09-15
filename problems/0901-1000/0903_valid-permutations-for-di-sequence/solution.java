class Solution {

    public int numPermsDISequence(String s) {
        // dp[i][j] counts ways to fill the first i+1 positions, valid so
        // far, with position i holding the j-th smallest value placed.
        // Appending a value of new rank j shifts older ranks >= j up one,
        // so an 'I' step admits exactly the old ranks below j and a 'D'
        // step the old ranks j and above — both are prefix sums of the
        // previous row: P[j] for 'I', P[m] - P[j] for 'D'. One rolling
        // row carries the table; the answer is sum dp[n][*].
        final int MOD = 1_000_000_007;
        int n = s.length();
        long[] dp = { 1 };
        for (int i = 0; i < n; ++i) {
            int m = dp.length;
            long[] prefix = new long[m + 1];
            for (int j = 0; j < m; ++j) {
                prefix[j + 1] = (prefix[j] + dp[j]) % MOD;
            }
            if (s.charAt(i) == 'I') {
                dp = prefix;
            } else {
                long[] next = new long[m + 1];
                for (int j = 0; j <= m; ++j) {
                    next[j] = (prefix[m] - prefix[j] + MOD) % MOD;
                }
                dp = next;
            }
        }
        long total = 0;
        for (long v : dp) {
            total += v;
        }
        return (int) (total % MOD);
    }
}
