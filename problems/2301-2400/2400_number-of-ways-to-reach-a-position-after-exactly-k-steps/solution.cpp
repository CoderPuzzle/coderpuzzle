class Solution {
  public:
    int numberOfWays(int startPos, int endPos, int k) {
        // Only the distance matters. With r right and l left steps,
        // r - l = d and r + l = k force d <= k, (k - d) even, and
        // right = (k + d) / 2; any ordering of the steps is a distinct
        // way, so the count is C(k, right) mod 1e9+7.
        const long long MOD = 1'000'000'007;
        long long d = llabs((long long)endPos - startPos);
        if (d > k || (k - d) % 2 != 0) {
            return 0;
        }
        long long right = (k + d) / 2;

        vector<long long> fact(k + 1, 1);
        for (long long i = 1; i <= k; ++i) {
            fact[i] = fact[i - 1] * i % MOD;
        }
        auto power = [&](long long base, long long exp) {
            long long result = 1;
            while (exp > 0) {
                if (exp & 1) {
                    result = result * base % MOD;
                }
                base = base * base % MOD;
                exp >>= 1;
            }
            return result;
        };
        vector<long long> inv_fact(k + 1, 1);
        inv_fact[k] = power(fact[k], MOD - 2);
        for (long long i = k; i >= 1; --i) {
            inv_fact[i - 1] = inv_fact[i] * i % MOD;
        }
        return (int)(fact[k] * inv_fact[right] % MOD * inv_fact[k - right] % MOD);
    }
};
