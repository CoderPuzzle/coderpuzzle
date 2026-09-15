class Solution {

    public int countValidSequences(int n, int k) {
        final long MOD = 1000000007L;
        // Factorials and inverse factorials up to n; the single modular
        // inverse comes from Fermat's little theorem (p prime), no floats.
        long[] fact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = (fact[i - 1] * i) % MOD;
        }
        long[] invFact = new long[n + 1];
        invFact[n] = powmod(fact[n], MOD - 2, MOD);
        for (int i = n; i >= 1; i--) {
            invFact[i - 1] = (invFact[i] * i) % MOD;
        }
        long total = comb(n - 1, k - 1, fact, invFact, MOD);
        // All-odd compositions exist iff n - k is even; substituting each
        // part x_i = 2*y_i + 1 leaves (n-k)/2 spread over k non-negative y_i.
        if ((n - k) % 2 == 0) {
            total -= comb((n + k) / 2 - 1, k - 1, fact, invFact, MOD);
        }
        return (int) (((total % MOD) + MOD) % MOD);
    }

    private long comb(int a, int b, long[] fact, long[] invFact, long mod) {
        if (b < 0 || b > a) {
            return 0;
        }
        return (((fact[a] * invFact[b]) % mod) * invFact[a - b]) % mod;
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
