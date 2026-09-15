class Solution {
  public:
    int numSquares(int n) {
        // dp[i] = fewest perfect squares summing to i: any decomposition ends
        // with some square s <= i, leaving the subproblem dp[i - s], so
        // dp[i] = 1 + min(dp[i - s]).
        vector<int> dp(n + 1, INT_MAX);
        // dp[0] = 0 anchors the induction (zero squares sum to zero).
        dp[0] = 0;
        // Filling i in increasing order means every dp[i - s] consulted is
        // already final; j*j <= i enumerates exactly the squares <= i.
        for (int i = 1; i <= n; ++i) {
            for (int j = 1; j * j <= i; ++j) {
                int s = j * j;
                if (dp[i - s] + 1 < dp[i])
                    dp[i] = dp[i - s] + 1;
            }
        }
        return dp[n];
    }
};
