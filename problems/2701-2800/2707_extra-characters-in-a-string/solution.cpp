class Solution {
  public:
    // dp[i] holds the fewest extra characters left over after breaking the
    // prefix s[0:i] optimally; dp[0] is the empty prefix.
    int minExtraChar(string s, vector<string> &dictionary) {
        int n = s.size();
        vector<int> dp(n + 1, n + 1);
        dp[0] = 0;
        for (int i = 0; i < n; ++i) {
            // skip move: leave s[i] as an extra character
            dp[i + 1] = min(dp[i + 1], dp[i] + 1);
            // match moves: a word starting at i jumps to i + word.size()
            for (const string &word : dictionary) {
                int j = i + word.size();
                if (j <= n && s.compare(i, word.size(), word) == 0 && dp[i] < dp[j]) {
                    dp[j] = dp[i];
                }
            }
        }
        return dp[n];
    }
};
