class Solution {
  public:
    int minimumDeleteSum(string s1, string s2) {
        const string &a = s1;
        const string &b = s2;
        const int la = (int)a.size(), lb = (int)b.size();
        // dp[i][j] = min deleted-ASCII cost of equalizing the prefixes a[:i], b[:j].
        vector<vector<int>> dp(la + 1, vector<int>(lb + 1, 0));
        // Base row/column: matching against the empty string deletes everything.
        for (int j = 1; j <= lb; j++) {
            dp[0][j] = dp[0][j - 1] + (int)b[j - 1];
        }
        for (int i = 1; i <= la; i++) {
            dp[i][0] = dp[i - 1][0] + (int)a[i - 1];
            for (int j = 1; j <= lb; j++) {
                if (a[i - 1] == b[j - 1]) {
                    // Equal chars are both kept — free reduction to shorter prefixes.
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    // A mismatch can retain at most one end: pay its ASCII value.
                    dp[i][j] = min(dp[i - 1][j] + (int)a[i - 1], dp[i][j - 1] + (int)b[j - 1]);
                }
            }
        }
        return dp[la][lb];
    }
};
