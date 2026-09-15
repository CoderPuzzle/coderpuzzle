class Solution {

    public int idealArrays(int n, int maxValue) {
        final long MOD = 1000000007L;
        // dp[v] = number of chains of the current length ending at value v
        long[] dp = new long[maxValue + 1];
        for (int v = 1; v <= maxValue; v++) {
            dp[v] = 1;
        }
        long comb = 1; // C(n-1, 0)
        long ans = 0;
        for (int chainLen = 1; chainLen <= n; chainLen++) {
            long total = 0;
            for (long x : dp) {
                total = (total + x) % MOD;
            }
            ans = (ans + total * comb) % MOD;
            if (chainLen == n) {
                break;
            }
            // C(n-1, chainLen) = C(n-1, chainLen-1) * (n - chainLen) / chainLen
            comb = (((comb * (n - chainLen)) % MOD) * powmod(chainLen, MOD - 2, MOD)) % MOD;
            long[] ndp = new long[maxValue + 1];
            for (int v = 1; v <= maxValue; v++) {
                long cv = dp[v];
                if (cv == 0) {
                    continue;
                }
                for (int m = v + v; m <= maxValue; m += v) {
                    ndp[m] = (ndp[m] + cv) % MOD;
                }
            }
            dp = ndp;
            long s = 0;
            for (long x : dp) {
                s += x;
            }
            if (s == 0) {
                break;
            }
        }
        return (int) (ans % MOD);
    }

    private long powmod(long base, long exp, long mod) {
        long r = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                r = (r * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return r;
    }
}
