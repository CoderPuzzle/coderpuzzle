class Solution {
  public:
    int lengthOfLongestSubsequence(vector<int> &nums, int target) {
        // dp[s] holds the longest subsequence length that sums exactly to s,
        // or -1 when s is unreachable. Sums never exceed target <= 1000, so
        // one flat array carries the whole state.
        vector<int> dp(target + 1, -1);
        dp[0] = 0;
        for (int num : nums) {
            // Walk s downward so each element contributes at most once
            // (0-1 knapsack, not unbounded).
            for (int s = target; s >= num; --s) {
                if (dp[s - num] != -1 && dp[s - num] + 1 > dp[s]) {
                    dp[s] = dp[s - num] + 1;
                }
            }
        }
        return dp[target];
    }
};
