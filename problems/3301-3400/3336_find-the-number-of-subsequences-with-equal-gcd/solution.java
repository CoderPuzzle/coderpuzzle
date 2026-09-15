class Solution {

    private static int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }

    public int subsequencePairCount(int[] nums) {
        final long MOD = 1_000_000_007L;
        // dp[g1][g2] = ways to split the processed prefix into a sequence with
        // gcd g1 and a sequence with gcd g2 (gcd 0 denotes an empty sequence).
        int maxVal = 200;
        long[][] dp = new long[maxVal + 1][maxVal + 1];
        long[][] ndp = new long[maxVal + 1][maxVal + 1];
        dp[0][0] = 1;
        for (int x : nums) {
            for (int g1 = 0; g1 <= maxVal; g1++) {
                for (int g2 = 0; g2 <= maxVal; g2++) {
                    ndp[g1][g2] = dp[g1][g2];
                }
            }
            for (int g1 = 0; g1 <= maxVal; g1++) {
                long[] row = dp[g1];
                for (int g2 = 0; g2 <= maxVal; g2++) {
                    long cur = row[g2];
                    if (cur == 0) continue;
                    int ng1 = gcd(g1, x);
                    ndp[ng1][g2] = (ndp[ng1][g2] + cur) % MOD;
                    int ng2 = gcd(g2, x);
                    ndp[g1][ng2] = (ndp[g1][ng2] + cur) % MOD;
                }
            }
            long[][] tmp = dp;
            dp = ndp;
            ndp = tmp;
        }

        long total = 0;
        for (int g = 1; g <= maxVal; g++) {
            total = (total + dp[g][g]) % MOD;
        }
        return (int) total;
    }
}
