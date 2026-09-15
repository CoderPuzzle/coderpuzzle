class Solution {
  public:
    int numWays(int steps, int arrLen) {
        const long long MOD = 1000000007LL;
        // each move shifts the position by at most one, so only the window
        // min(arrLen, steps + 1) is reachable — cost is independent of a
        // huge arrLen
        int n = min(arrLen, steps + 1);
        // dp[i] = number of ways to stand at position i after the moves
        // processed so far
        vector<long long> dp(n, 0), ndp(n, 0);
        dp[0] = 1;
        for (int s = 0; s < steps; s++) {
            for (int i = 0; i < n; i++) {
                // stay, or arrive from the left/right neighbor — both
                // guarded by the window bounds
                long long total = dp[i];
                if (i > 0)
                    total += dp[i - 1];
                if (i + 1 < n)
                    total += dp[i + 1];
                ndp[i] = total % MOD;
            }
            swap(dp, ndp);
        }
        // walks that return to the origin after exactly `steps` moves
        return (int)dp[0];
    }
};
