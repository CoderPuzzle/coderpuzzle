class Solution {

    public int countGoodArrays(int n, int m, int k) {
        final long MOD = 1_000_000_007L;
        // answer = m * C(n-1, k) * (m-1)^(n-1-k)  (mod 1e9+7)
        long[] fact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = (fact[i - 1] * i) % MOD;
        }
        long[] invFact = new long[n + 1];
        invFact[n] = powMod(fact[n], MOD - 2, MOD);
        for (int i = n; i >= 1; i--) {
            invFact[i - 1] = (invFact[i] * i) % MOD;
        }

        long comb = k < 0 || k > n - 1 ? 0 : (((fact[n - 1] * invFact[k]) % MOD) * invFact[n - 1 - k]) % MOD;

        return (int) (((((long) (m % MOD) * comb) % MOD) * powMod(m - 1, n - 1 - k, MOD)) % MOD);
    }

    private long powMod(long base, long exp, long mod) {
        long result = 1;
        long b = base % mod;
        long e = exp;
        while (e > 0) {
            if ((e & 1) == 1) result = (result * b) % mod;
            b = (b * b) % mod;
            e >>= 1;
        }
        return result;
    }
}
