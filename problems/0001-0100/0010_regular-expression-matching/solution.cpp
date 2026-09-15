class Solution {
  public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        // dp[i][j]: do the first i chars of s match the first j chars of p?
        vector<vector<char>> dp(m + 1, vector<char>(n + 1, 0));
        // The empty string matches the empty pattern.
        dp[0][0] = 1;
        // First row: only trailing x* units can vanish, so dropping the
        // star's two-character unit must still match nothing.
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[0][j] = dp[0][j - 2];
            }
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '*') {
                    // Two cases cover every repetition count: zero
                    // occurrences (erase the x* unit), or one more
                    // occurrence of p[j-2] consuming s[i-1].
                    dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (p[j - 2] == '.' || p[j - 2] == s[i - 1]));
                } else {
                    // A literal or '.' must consume one character of s that
                    // it equals ('.' agrees with anything).
                    dp[i][j] = dp[i - 1][j - 1] && (p[j - 1] == '.' || p[j - 1] == s[i - 1]);
                }
            }
        }
        // Prefix table: true only when the pattern matches all of s.
        return dp[m][n] != 0;
    }
};
