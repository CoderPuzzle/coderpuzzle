class Solution {
  public:
    int numberOfGoodSubsets(vector<int> &nums) {
        const long long MOD = 1000000007LL;
        const int PRIMES[10] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};

        // Compress to frequencies: subsets are distinguished by index, so
        // equal values contribute multiplicity.
        map<int, int> count;
        for (int v : nums) {
            count[v]++;
        }

        int size = 1 << 10;
        // dp[mask] = ways to pick indices whose product's prime set is
        // exactly mask -- a 0/1-knapsack over prime masks.
        vector<long long> dp(size, 0);
        dp[0] = 1;
        for (auto &[value, freq] : count) {
            if (value == 1) { // empty mask; handled separately at the end
                continue;
            }
            // Map the value onto its 10-bit prime mask; reject values
            // divisible by a prime square (4, 8, 9, ...).
            int mask = 0;
            bool bad = false;
            int x = value;
            for (int i = 0; i < 10; i++) {
                int p = PRIMES[i];
                if (x % p == 0) {
                    mask |= 1 << i;
                    x /= p;
                    if (x % p == 0) {
                        bad = true;
                        break;
                    }
                }
            }
            if (bad || mask == 0) {
                continue;
            }
            // Decreasing mask order keeps one value from being used twice in
            // a subset; only disjoint states (no shared prime) may extend.
            for (int prev = size - 1; prev >= 0; prev--) {
                if (dp[prev] && (prev & mask) == 0) {
                    dp[prev | mask] = (dp[prev | mask] + dp[prev] * freq) % MOD;
                }
            }
        }
        // Good subsets need at least one prime: sum every non-empty mask.
        long long total = 0;
        for (int i = 1; i < size; i++) {
            total = (total + dp[i]) % MOD;
        }
        // Each 1 freely appends to any good subset without changing the
        // product: a factor 2^count[1].
        long long ones = count.count(1) ? count[1] : 0;
        long long pow = 1;
        for (long long i = 0; i < ones; i++) {
            pow = pow * 2 % MOD;
        }
        return (int)(total * pow % MOD);
    }
};
