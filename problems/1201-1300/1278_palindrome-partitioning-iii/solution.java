class Solution {

    public int palindromePartition(String s, int k) {
        int n = s.length();
        char[] cs = s.toCharArray();
        // cost[i][j] = min changes to make s[i..j] a palindrome
        int[][] cost = new int[n][n];
        for (int len = 2; len <= n; ++len) {
            for (int i = 0; i + len <= n; ++i) {
                int j = i + len - 1;
                // each mismatched outer pair costs one change; the
                // interior cost is already known (lengths grow)
                cost[i][j] = cost[i + 1][j - 1] + (cs[i] == cs[j] ? 0 : 1);
            }
        }
        // dp[c][i] = min changes to split prefix of length i into c parts
        int inf = n / 2 + 1; // any interval costs at most n / 2
        int[][] dp = new int[k + 1][n + 1];
        for (int c = 0; c <= k; ++c) {
            for (int i = 0; i <= n; ++i) {
                dp[c][i] = inf;
            }
        }
        for (int i = 1; i <= n; ++i) {
            dp[1][i] = cost[0][i - 1];
        }
        for (int c = 2; c <= k; ++c) {
            // i starts at c: c non-empty parts need at least c characters
            for (int i = c; i <= n; ++i) {
                int best = inf;
                // the last part is s[j..i-1] — try every left boundary
                for (int j = c - 1; j < i; ++j) {
                    int cand = dp[c - 1][j] + cost[j][i - 1];
                    if (cand < best) {
                        best = cand;
                    }
                }
                dp[c][i] = best;
            }
        }
        return dp[k][n];
    }
}
