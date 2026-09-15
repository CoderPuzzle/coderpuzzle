class Solution {
  public:
    int maximumJumps(vector<int> &nums, int target) {
        // dp[j] = max jumps to reach j (-1 = unreachable). Every edge i -> j
        // has i < j, so the jump graph is a DAG in index order and one
        // ascending sweep relaxes every edge exactly once.
        int n = nums.size();
        vector<int> dp(n, -1);
        dp[0] = 0;
        for (int j = 1; j < n; ++j) {
            int best = -1;
            for (int i = 0; i < j; ++i) {
                if (dp[i] == -1)
                    continue;
                // Widen before subtracting: the gap can reach +-2e9, the very
                // edge of the int range under the stated constraints.
                long long diff = (long long)nums[j] - nums[i];
                if (-target <= diff && diff <= target && dp[i] + 1 > best) {
                    best = dp[i] + 1;
                }
            }
            dp[j] = best;
        }
        return dp[n - 1];
    }
};
