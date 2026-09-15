class Solution {

    public int numberOfWays(int n, int m, int k, int[] source, int[] dest) {
        final long MOD = 1_000_000_007L;
        // a[t]: walks of t steps (each step to a different position on a
        // line of `size` cells) that end at target; b[t]: walks that end
        // anywhere else. A step into target can come from any other
        // position; a step elsewhere has size - 1 options from target
        // and size - 2 from any other position.
        long[] ax = lineCounts(n, source[0], dest[0], k, MOD);
        long[] ay = lineCounts(m, source[1], dest[1], k, MOD);
        // Factorials for choosing which of the k moves change x.
        long[] fact = new long[k + 1];
        fact[0] = 1;
        for (int i = 1; i <= k; ++i) fact[i] = (fact[i - 1] * i) % MOD;
        long[] invFact = new long[k + 1];
        invFact[k] = pow(fact[k], MOD - 2, MOD);
        for (int i = k; i >= 1; --i) invFact[i - 1] = (invFact[i] * i) % MOD;
        // A move keeps one coordinate fixed, so x and y evolve independently:
        // with i of the k moves changing x, the x-walk has i steps, the
        // y-walk k - i steps, and their interleavings number C(k, i).
        long ans = 0;
        for (int i = 0; i <= k; ++i) {
            long comb = (((fact[k] * invFact[i]) % MOD) * invFact[k - i]) % MOD;
            ans = (ans + ((comb * ax[i]) % MOD) * ay[k - i]) % MOD;
        }
        return (int) ans;
    }

    private long[] lineCounts(int size, int start, int target, int k, long mod) {
        long[] a = new long[k + 1];
        long[] b = new long[k + 1];
        a[0] = start == target ? 1 : 0;
        b[0] = 1 - a[0];
        long offByOne = (size - 1) % mod;
        long offByTwo = (size - 2) % mod;
        for (int t = 0; t < k; ++t) {
            a[t + 1] = b[t];
            b[t + 1] = (a[t] * offByOne + b[t] * offByTwo) % mod;
        }
        return a;
    }

    private long pow(long base, long exp, long mod) {
        long result = 1;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * base) % mod;
            base = (base * base) % mod;
            exp >>= 1;
        }
        return result;
    }
}
