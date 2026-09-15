class Solution {

    public int[] productQueries(int n, int[][] queries) {
        // The minimum set of powers of two summing to n is exactly its set
        // bits (hint 1), so powers is the sorted list of 1 << b for each
        // set bit b. A range product of ascending powers of two is itself
        // a power of two — 2^(exponent sum) — but under the modulus the
        // clean tool is prefix products with one modular inverse per query
        // (Fermat, MOD prime): product(lo..hi) = pref[hi+1] * inv(pref[lo]).
        final int MOD = 1_000_000_007;
        int[] powers = new int[Integer.bitCount(n)];
        for (int b = 0, i = 0; b < 30; ++b) {
            if (((n >> b) & 1) == 1) {
                powers[i++] = 1 << b;
            }
        }
        long[] pref = new long[powers.length + 1];
        pref[0] = 1;
        for (int i = 0; i < powers.length; ++i) {
            pref[i + 1] = (pref[i] * powers[i]) % MOD;
        }
        int[] answers = new int[queries.length];
        for (int q = 0; q < queries.length; ++q) {
            int lo = queries[q][0],
                hi = queries[q][1];
            answers[q] = (int) ((pref[hi + 1] * powMod(pref[lo], MOD - 2, MOD)) % MOD);
        }
        return answers;
    }

    private long powMod(long base, long exp, long mod) {
        long result = 1;
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
