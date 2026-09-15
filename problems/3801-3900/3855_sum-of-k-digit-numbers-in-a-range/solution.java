class Solution {

    public long sumOfNumbers(int l, int r, int k) {
        final long MOD = 1_000_000_007L;
        long m = r - l + 1;
        long digitSum = ((l + r) * m) / 2;
        // A fixed position holds any one digit d of [l, r] in exactly
        // m^(k-1) of the m^k strings, so it contributes digitSum *
        // m^(k-1) * 10^p; the place weights sum to the repunit
        // R(k) = (10^k - 1) / 9, reduced through Fermat's inverse of 9.
        long repunit = (((pow(10, k, MOD) - 1) % MOD) * pow(9, MOD - 2, MOD)) % MOD;
        return ((((digitSum % MOD) * pow(m, k - 1, MOD)) % MOD) * repunit) % MOD;
    }

    // Binary exponentiation: reduced factors stay below 2^30, so every
    // product fits long exactly (below 2^60).
    private long pow(long base, long exp, long mod) {
        long result = 1;
        long b = base % mod;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * b) % mod;
            b = (b * b) % mod;
            exp >>= 1;
        }
        return result;
    }
}
