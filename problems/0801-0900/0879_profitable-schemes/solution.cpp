class Solution {
  public:
    int profitableSchemes(int n, int minProfit, vector<int> &group, vector<int> &profit) {
        const long long MOD = 1000000007;
        // dp[members][cap] = number of subsets using at most `members` members
        // and at least `cap` profit; cap is capped at minProfit.
        vector<vector<long long>> dp(n + 1, vector<long long>(minProfit + 1, 0));
        for (int members = 0; members <= n; members++) {
            dp[members][0] = 1;
        }
        for (size_t idx = 0; idx < group.size(); idx++) {
            int g = group[idx];
            int p = profit[idx];
            for (int members = n; members >= g; members--) {
                for (int cap = minProfit; cap >= 0; cap--) {
                    int prev = max(0, cap - p);
                    dp[members][cap] = (dp[members][cap] + dp[members - g][prev]) % MOD;
                }
            }
        }
        return (int)dp[n][minProfit];
    }
};
