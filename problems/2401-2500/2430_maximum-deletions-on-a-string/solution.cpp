class Solution {
  public:
    int deleteString(string s) {
        // dp[i] = max operations to delete s[i:]; LCP via two rolling rows
        int n = (int)s.size();
        vector<int> dp(n + 1, 1);
        dp[n] = 0;                     // empty suffix needs no operations
        vector<int> nextRow(n + 1, 0); // lcp row for index i+1
        for (int i = n - 1; i >= 0; i--) {
            char si = s[i];
            vector<int> cur(n + 1, 0);
            for (int j = n - 1; j >= 0; j--) {
                if (si == s[j]) {
                    cur[j] = nextRow[j + 1] + 1;
                }
            }
            int best = 1;
            int maxLen = (n - i) / 2;
            for (int length = 1; length <= maxLen; length++) {
                if (cur[i + length] >= length) {
                    int cand = 1 + dp[i + length];
                    if (cand > best) {
                        best = cand;
                    }
                }
            }
            dp[i] = best;
            nextRow = cur;
        }
        return dp[0];
    }
};
