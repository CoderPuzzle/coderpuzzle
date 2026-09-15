class Solution {
  public:
    int numRollsToTarget(int n, int k, int target) {
        const int MOD = 1000000007;
        // dp[t]: ways for the dice processed so far to show sum t
        vector<int> dp(target + 1, 0), ndp(target + 1, 0);
        // zero dice reach sum 0 in exactly one way
        dp[0] = 1;
        for (int d = 0; d < n; d++) {
            // fresh table per die: the transition must read only the
            // previous die's distribution, else one die could count twice
            fill(ndp.begin(), ndp.end(), 0);
            for (int t = 1; t <= target; t++) {
                long long s = 0;
                // every face value f is a distinct outcome, so all faces are
                // summed; min(k, t) skips faces that overshoot the target
                int hi = min(k, t);
                for (int f = 1; f <= hi; f++) {
                    s += dp[t - f];
                }
                ndp[t] = (int)(s % MOD);
            }
            swap(dp, ndp);
        }
        // targets no die sequence reaches were never written, so read as 0
        return dp[target];
    }
};
