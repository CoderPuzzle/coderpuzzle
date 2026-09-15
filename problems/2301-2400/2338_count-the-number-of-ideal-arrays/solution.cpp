class Solution {
  public:
    int idealArrays(int n, int maxValue) {
        const long long MOD = 1000000007LL;
        // dp[v] = number of chains of the current length ending at value v
        vector<long long> dp(maxValue + 1, 0);
        for (int v = 1; v <= maxValue; v++) {
            dp[v] = 1;
        }
        long long comb = 1; // C(n-1, 0)
        long long ans = 0;
        for (int chainLen = 1; chainLen <= n; chainLen++) {
            long long total = 0;
            for (long long x : dp) {
                total = (total + x) % MOD;
            }
            ans = (ans + total * comb) % MOD;
            if (chainLen == n) {
                break;
            }
            // C(n-1, chainLen) = C(n-1, chainLen-1) * (n - chainLen) / chainLen
            comb = comb * (n - chainLen) % MOD * powmod(chainLen, MOD - 2, MOD) % MOD;
            vector<long long> ndp(maxValue + 1, 0);
            for (int v = 1; v <= maxValue; v++) {
                long long cv = dp[v];
                if (cv == 0) {
                    continue;
                }
                for (int m = v + v; m <= maxValue; m += v) {
                    ndp[m] = (ndp[m] + cv) % MOD;
                }
            }
            dp = ndp;
            long long s = 0;
            for (long long x : dp) {
                s += x;
            }
            if (s == 0) {
                break;
            }
        }
        return (int)(ans % MOD);
    }

  private:
    long long powmod(long long base, long long exp, long long mod) {
        long long r = 1;
        base %= mod;
        while (exp > 0) {
            if (exp & 1) {
                r = r * base % mod;
            }
            base = base * base % mod;
            exp >>= 1;
        }
        return r;
    }
};
