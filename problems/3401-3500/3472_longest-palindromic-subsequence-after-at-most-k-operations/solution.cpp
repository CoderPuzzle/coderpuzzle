class Solution {
  public:
    int longestPalindromicSubsequence(string s, int k) {
        int n = (int)s.size();
        // dp[i][j][c] = longest palindromic subsequence of s[i..j] using at most c
        // operations.
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(n, vector<int>(k + 1, 0)));
        for (int i = 0; i < n; i++) {
            for (int c = 0; c <= k; c++) {
                dp[i][i][c] = 1;
            }
        }
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                for (int c = 0; c <= k; c++) {
                    int best = dp[i + 1][j][c];
                    if (dp[i][j - 1][c] > best)
                        best = dp[i][j - 1][c];
                    int d = abs(s[i] - s[j]);
                    d = min(d, 26 - d);
                    if (d <= c) {
                        int val = dp[i + 1][j - 1][c - d] + 2;
                        if (val > best)
                            best = val;
                    }
                    dp[i][j][c] = best;
                }
            }
        }
        return dp[0][n - 1][k];
    }
};
