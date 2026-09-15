class Solution {
  public:
    int stringCount(int n) {
        // Inclusion-exclusion over the three deficits (missing 'l',
        // missing 't', at most one 'e'): 26^n minus strings missing each
        // requirement, re-adding intersections. Each modular power stays
        // below 10^9+7, so the signed sum fits a long long with room to
        // spare.
        const long long MOD = 1000000007LL;
        auto pow = [&](long long base, long long exp) {
            long long result = 1;
            long long factor = base % MOD;
            while (exp > 0) {
                if (exp & 1) {
                    result = result * factor % MOD;
                }
                factor = factor * factor % MOD;
                exp >>= 1;
            }
            return result;
        };
        long long wide = n % MOD;
        long long total = pow(26, n) - 3 * pow(25, n) - wide * pow(25, n - 1) + 3 * pow(24, n) +
                          2 * wide * pow(24, n - 1) - pow(23, n) - wide * pow(23, n - 1);
        return static_cast<int>((total % MOD + MOD) % MOD);
    }
};
