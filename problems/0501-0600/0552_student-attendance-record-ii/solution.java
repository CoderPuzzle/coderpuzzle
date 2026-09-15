class Solution {

    public int checkRecord(int n) {
        final int MOD = 1000000007;
        // dp[a][l] = number of records so far with `a` absences (<2)
        // and `l` trailing consecutive lates (<3)
        long[][] dp = new long[2][3];
        dp[0][0] = 1;
        for (int step = 0; step < n; step++) {
            long[][] ndp = new long[2][3];
            for (int a = 0; a < 2; a++) {
                for (int l = 0; l < 3; l++) {
                    long v = dp[a][l];
                    if (v == 0) continue;
                    ndp[a][0] = (ndp[a][0] + v) % MOD; // append 'P'
                    if (a + 1 < 2) {
                        ndp[a + 1][0] = (ndp[a + 1][0] + v) % MOD; // append 'A'
                    }
                    if (l + 1 < 3) {
                        ndp[a][l + 1] = (ndp[a][l + 1] + v) % MOD; // append 'L'
                    }
                }
            }
            dp = ndp;
        }
        long total = 0;
        for (int a = 0; a < 2; a++) {
            for (int l = 0; l < 3; l++) {
                total = (total + dp[a][l]) % MOD;
            }
        }
        return (int) total;
    }
}
