class Solution {

    public int numberOfWays(int startPos, int endPos, int k) {
        // Only the distance matters. With r right and l left steps,
        // r - l = d and r + l = k force d <= k, (k - d) even, and
        // right = (k + d) / 2; any ordering of the steps is a distinct
        // way, so the count is C(k, right) mod 1e9+7.
        final long MOD = 1_000_000_007L;
        long d = Math.abs((long) endPos - startPos);
        if (d > k || (k - d) % 2 != 0) {
            return 0;
        }
        long right = (k + d) / 2;

        long[] fact = new long[k + 1];
        fact[0] = 1;
        for (int i = 1; i <= k; ++i) {
            fact[i] = (fact[i - 1] * i) % MOD;
        }
        long[] invFact = new long[k + 1];
        invFact[k] = power(fact[k], MOD - 2, MOD);
        for (int i = k; i >= 1; --i) {
            invFact[i - 1] = (invFact[i] * i) % MOD;
        }
        return (int) ((((fact[k] * invFact[(int) right]) % MOD) * invFact[(int) (k - right)]) % MOD);
    }

    private long power(long base, long exp, long mod) {
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
