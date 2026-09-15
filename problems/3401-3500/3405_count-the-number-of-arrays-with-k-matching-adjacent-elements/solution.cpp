class Solution {
  public:
    int countGoodArrays(int n, int m, int k) {
        const long long MOD = 1000000007LL;
        // answer = m * C(n-1, k) * (m-1)^(n-1-k)  (mod 1e9+7)
        vector<long long> fact(n + 1);
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i % MOD;
        }
        vector<long long> inv_fact(n + 1);
        inv_fact[n] = powMod(fact[n], MOD - 2, MOD);
        for (int i = n; i >= 1; i--) {
            inv_fact[i - 1] = inv_fact[i] * i % MOD;
        }

        long long comb = 0;
        if (k >= 0 && k <= n - 1) {
            comb = fact[n - 1] * inv_fact[k] % MOD * inv_fact[n - 1 - k] % MOD;
        }

        return (int)((long long)(m % MOD) * comb % MOD * powMod(m - 1, n - 1 - k, MOD) % MOD);
    }

  private:
    long long powMod(long long base, long long exp, long long mod) {
        long long result = 1;
        long long b = base % mod;
        long long e = exp;
        while (e > 0) {
            if (e & 1)
                result = result * b % mod;
            b = b * b % mod;
            e >>= 1;
        }
        return result;
    }
};
