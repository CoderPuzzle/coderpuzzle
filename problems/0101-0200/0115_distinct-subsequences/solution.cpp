class Solution {
  public:
    int numDistinct(string s, string t) {
        int m = (int)t.size();
        // dp[j] = ways to form the first j chars of t using the prefix of s
        // processed so far. dp[0] = 1 encodes the empty string being formable
        // exactly once, by matching nothing. Counts are kept in long longs
        // for headroom during the run.
        vector<long long> dp(m + 1, 0);
        dp[0] = 1;
        for (char ch : s) {
            // Sweep j downward so dp[j-1] is still the previous row's value
            // when read; a left-to-right sweep would let one character of s
            // be matched against several characters of t.
            for (int j = m; j > 0; j--) {
                // Reading ch can only create new ways where it matches: every
                // earlier way of forming t[:j-1] extends by matching ch there.
                // Elsewhere ch is simply skipped and the count is unchanged.
                if (t[j - 1] == ch) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return (int)dp[m];
    }
};
