class Solution {
  public:
    int squareFreeSubsets(vector<int> &nums) {
        const long long MOD = 1000000007LL;
        int PRIMES[10] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29};
        vector<int> counts(31, 0);
        for (int v : nums) {
            counts[v]++;
        }
        // dp[mask] = ways to pick a square-free set of numbers (at most one copy
        // of each value, values > 1) whose combined prime factors are `mask`.
        vector<long long> dp(1 << 10, 0);
        dp[0] = 1;
        for (int value = 2; value <= 30; value++) {
            int cnt = counts[value];
            if (cnt == 0) {
                continue;
            }
            int mask = 0;
            bool usable = true;
            for (int i = 0; i < 10; i++) {
                int p = PRIMES[i];
                if (value % p == 0) {
                    if (value % (p * p) == 0) {
                        usable = false;
                        break;
                    }
                    mask |= 1 << i;
                }
            }
            if (!usable) {
                continue; // contains a squared prime factor; never usable
            }
            vector<long long> ndp = dp;
            for (int m = 0; m < (1 << 10); m++) {
                if (dp[m] != 0 && (m & mask) == 0) {
                    int t = m | mask;
                    ndp[t] = (ndp[t] + dp[m] * (long long)cnt) % MOD;
                }
            }
            dp = ndp;
        }

        long long ways = 0;
        for (long long x : dp) {
            ways = (ways + x) % MOD;
        }
        int ones = counts[1];
        if (ones > 0) {
            long long factor = 1;
            for (int i = 0; i < ones; i++) {
                factor = factor * 2 % MOD;
            }
            ways = ways * factor % MOD;
        }
        ways = ((ways - 1) % MOD + MOD) % MOD; // drop the empty subset
        return (int)ways;
    }
};
