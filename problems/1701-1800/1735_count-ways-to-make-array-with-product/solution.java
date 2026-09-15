class Solution {

    private static final long MOD = 1_000_000_007L;
    private static final int MAX = 20000;
    private static long[] fact = buildFact();
    private static long[] invFact = buildInvFact();

    private static long[] buildFact() {
        long[] f = new long[MAX + 1];
        f[0] = 1;
        for (int i = 1; i <= MAX; i++) {
            f[i] = (f[i - 1] * i) % MOD;
        }
        return f;
    }

    private static long modPow(long base, long exp) {
        long result = 1;
        long b = base % MOD;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * b) % MOD;
            b = (b * b) % MOD;
            exp >>= 1;
        }
        return result;
    }

    private static long[] buildInvFact() {
        long[] inv = new long[MAX + 1];
        // One Fermat inversion at the top; running it backwards yields every
        // smaller inverse factorial with a single multiplication each.
        inv[MAX] = modPow(fact[MAX], MOD - 2);
        for (int i = MAX; i > 0; i--) {
            inv[i - 1] = (inv[i] * i) % MOD;
        }
        return inv;
    }

    private static long comb(int n, int r) {
        if (r < 0 || r > n) return 0;
        return (((fact[n] * invFact[r]) % MOD) * invFact[n - r]) % MOD;
    }

    public int[] waysToFillArray(int[][] queries) {
        int[] answers = new int[queries.length];
        for (int q = 0; q < queries.length; q++) {
            int n = queries[q][0];
            int k = queries[q][1];
            long ways = 1;
            // Trial division up to sqrt(k) collects each prime's exponent.
            int d = 2;
            while (d * d <= k) {
                if (k % d == 0) {
                    int exponent = 0;
                    while (k % d == 0) {
                        k /= d;
                        exponent++;
                    }
                    // Primes never interact, so the per-prime counts
                    // multiply: spreading x copies of one prime over n
                    // slots is stars and bars, C(x + n - 1, n - 1).
                    ways = (ways * comb(exponent + n - 1, n - 1)) % MOD;
                }
                d++;
            }
            // A leftover greater than 1 is a prime of exponent 1.
            if (k > 1) {
                ways = (ways * comb(1 + n - 1, n - 1)) % MOD;
            }
            answers[q] = (int) ways;
        }
        return answers;
    }
}
