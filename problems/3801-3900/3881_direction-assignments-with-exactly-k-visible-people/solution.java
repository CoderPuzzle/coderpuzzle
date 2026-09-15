class Solution {

    public int countVisiblePeople(int n, int pos, int k) {
        // The number seen is (# left people choosing 'L') + (# right people
        // choosing 'R'), so Vandermonde's identity collapses the split sum
        // to 2 * C(n - 1, k). Modular products fit long, the answer is an int.
        final long MOD = 1_000_000_007L;
        if (k > n - 1) {
            return 0;
        }
        int size = n - 1;
        long[] fact = new long[size + 1];
        long[] invFact = new long[size + 1];
        fact[0] = 1;
        for (int i = 1; i <= size; i++) {
            fact[i] = (fact[i - 1] * i) % MOD;
        }
        invFact[size] = modPow(fact[size], MOD - 2, MOD);
        for (int i = size; i > 0; i--) {
            invFact[i - 1] = (invFact[i] * i) % MOD;
        }
        long comb = (((fact[n - 1] * invFact[k]) % MOD) * invFact[n - 1 - k]) % MOD;
        return (int) ((2 * comb) % MOD);
    }

    // Fermat inverse via binary exponentiation, all products inside long.
    private long modPow(long base, long exp, long mod) {
        long result = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return result;
    }
}
