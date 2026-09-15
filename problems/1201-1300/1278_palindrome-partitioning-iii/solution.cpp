class Solution {
  public:
    int palindromePartition(string s, int k) {
        int n = (int)s.size();
        // cost[i][j] = min changes to make s[i..j] a palindrome
        vector<vector<int>> cost(n, vector<int>(n, 0));
        for (int len = 2; len <= n; ++len) {
            for (int i = 0; i + len <= n; ++i) {
                int j = i + len - 1;
                // each mismatched outer pair costs one change; the
                // interior cost is already known (lengths grow)
                cost[i][j] = cost[i + 1][j - 1] + (s[i] == s[j] ? 0 : 1);
            }
        }
        // dp[c][i] = min changes to split prefix of length i into c parts
        const int INF = n / 2 + 1; // any interval costs at most n / 2
        vector<vector<int>> dp(k + 1, vector<int>(n + 1, INF));
        for (int i = 1; i <= n; ++i) {
            dp[1][i] = cost[0][i - 1];
        }
        for (int c = 2; c <= k; ++c) {
            // i starts at c: c non-empty parts need at least c characters
            for (int i = c; i <= n; ++i) {
                int best = INF;
                // the last part is s[j..i-1] — try every left boundary
                for (int j = c - 1; j < i; ++j) {
                    best = min(best, dp[c - 1][j] + cost[j][i - 1]);
                }
                dp[c][i] = best;
            }
        }
        return dp[k][n];
    }
};
