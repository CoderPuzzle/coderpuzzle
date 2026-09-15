class Solution {
  public:
    int selfDivisiblePermutationCount(int n) {
        // Position i (1-indexed) may receive value v exactly when gcd(v, i)
        // is 1. Precompute that compatibility grid once, then count valid
        // permutations with a subset DP: dp[mask] is the number of ways to
        // fill the first popcount(mask) positions using exactly the values
        // in mask, so extending by the last-placed value v gives
        // dp[mask] = sum over compatible v in mask of dp[mask without v].
        // Even the theoretical bound 12! fits a 32-bit int.
        vector<vector<int>> compat(n, vector<int>(n));
        for (int i = 1; i <= n; ++i)
            for (int v = 1; v <= n; ++v)
                compat[i - 1][v - 1] = std::gcd(v, i) == 1;
        int full = 1 << n;
        vector<int> dp(full);
        dp[0] = 1;
        for (int mask = 1; mask < full; ++mask) {
            int pos = __builtin_popcount(mask); // 1-indexed position now
            const vector<int> &row = compat[pos - 1];
            int total = 0;
            for (int v = 0; v < n; ++v) {
                if ((mask >> v) & 1 && row[v])
                    total += dp[mask ^ (1 << v)];
            }
            dp[mask] = total;
        }
        return dp[full - 1];
    }
};
