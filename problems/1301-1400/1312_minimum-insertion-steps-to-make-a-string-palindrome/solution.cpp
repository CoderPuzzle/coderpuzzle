class Solution {
  public:
    int minInsertions(string s) {
        int n = s.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                if (s[i] == s[j]) {
                    dp[i][j] = length > 2 ? dp[i + 1][j - 1] : 0;
                } else {
                    dp[i][j] = 1 + min(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        return n == 0 ? 0 : dp[0][n - 1];
    }
};
