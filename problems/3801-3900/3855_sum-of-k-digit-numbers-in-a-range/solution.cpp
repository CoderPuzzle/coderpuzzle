class Solution {
  public:
    long long sumOfNumbers(int l, int r, int k) {
        const long long MOD = 1'000'000'007;
        long long m = r - l + 1;
        long long digitSum = (l + r) * m / 2;
        // A fixed position holds any one digit d of [l, r] in exactly
        // m^(k-1) of the m^k strings, so it contributes digitSum *
        // m^(k-1) * 10^p; the place weights sum to the repunit
        // R(k) = (10^k - 1) / 9, reduced through Fermat's inverse of 9.
        long long repunit = (powMod(10, k, MOD) - 1) % MOD * powMod(9, MOD - 2, MOD) % MOD;
        return digitSum % MOD * powMod(m, k - 1, MOD) % MOD * repunit % MOD;
    }

  private:
    // Binary exponentiation: reduced factors stay below 2^30, so every
    // product fits long long exactly (below 2^60).
    long long powMod(long long base, long long exp, long long mod) {
        long long result = 1;
        long long b = base % mod;
        while (exp > 0) {
            if (exp & 1)
                result = result * b % mod;
            b = b * b % mod;
            exp >>= 1;
        }
        return result;
    }
};
