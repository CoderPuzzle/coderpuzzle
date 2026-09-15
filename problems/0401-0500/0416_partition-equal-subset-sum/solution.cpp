class Solution {
  public:
    bool canPartition(vector<int> &nums) {
        long long total = 0;
        for (int v : nums)
            total += v;
        // An odd total cannot split into two equal halves.
        if (total % 2 != 0)
            return false;
        int target = (int)(total / 2);
        // dp[s]: some subset of the numbers processed so far sums to s.
        vector<char> dp(target + 1, 0);
        dp[0] = 1;
        for (int v : nums) {
            // Sweep sums downward so v is used at most once (0/1 knapsack).
            for (int j = target; j >= v; j--) {
                if (dp[j - v])
                    dp[j] = 1;
            }
            // Target reachable: the complement subset completes the split.
            if (dp[target])
                return true;
        }
        return dp[target] != 0;
    }
};
