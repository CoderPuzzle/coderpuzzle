class Solution {
  public:
    int findMaxForm(vector<string> &strs, int m, int n) {
        // dp[i][j] = most strings pickable with at most i zeros and j ones:
        // a 0/1 knapsack with two resource axes; the all-zero table already
        // encodes "pick nothing".
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (const string &s : strs) {
            // Only the string's shape matters: its 0-count and 1-count.
            int zeros = 0;
            for (char ch : s) {
                if (ch == '0')
                    zeros++;
            }
            int ones = (int)s.size() - zeros;
            // Budgets iterate downward so every read sees values from
            // before this string's pass — enforcing 0/1 (once-per-string)
            // use. Take-or-skip: taking is optional when it doesn't pay.
            for (int i = m; i >= zeros; i--) {
                for (int j = n; j >= ones; j--) {
                    dp[i][j] = max(dp[i][j], dp[i - zeros][j - ones] + 1);
                }
            }
        }
        return dp[m][n];
    }
};
