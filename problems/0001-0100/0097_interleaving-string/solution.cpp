class Solution {
  public:
    bool isInterleave(string s1, string s2, string s3) {
        // No interleaving can add or drop letters, so settle the length first.
        const int m = s1.size(), n = s2.size();
        if (m + n != (int)s3.size())
            return false;
        // dp[i][j]: the first i letters of s1 and the first j letters of s2
        // can interleave into the first i + j letters of s3.
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        for (int i = 1; i <= m; ++i)
            dp[i][0] = dp[i - 1][0] && s1[i - 1] == s3[i - 1];
        for (int j = 1; j <= n; ++j)
            dp[0][j] = dp[0][j - 1] && s2[j - 1] == s3[j - 1];
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                // The prefix's last letter came from one of the two strings:
                // keep whichever source still has a living reach.
                dp[i][j] = (dp[i - 1][j] && s1[i - 1] == s3[i + j - 1]) || (dp[i][j - 1] && s2[j - 1] == s3[i + j - 1]);
            }
        }
        return dp[m][n];
    }
};
