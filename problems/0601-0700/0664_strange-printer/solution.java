class Solution {

    public int strangePrinter(String s) {
        // dp[i][j] is the fewest turns that print s[i..j]. The stroke that
        // leaves s[i] standing either covers i alone, dp[i+1][j] + 1, or
        // runs on to some k with s[k] == s[i]: that stroke is shared with
        // the suffix s[k..j] while the overprinted gap s[i+1..k-1] is
        // solved on its own, dp[i+1][k-1] + dp[k][j].
        int n = s.length();
        int[][] dp = new int[n][n];
        for (int i = n - 1; i >= 0; --i) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; ++j) {
                int best = dp[i + 1][j] + 1;
                for (int k = i + 1; k <= j; ++k) {
                    if (s.charAt(k) == s.charAt(i)) {
                        best = Math.min(best, dp[i + 1][k - 1] + dp[k][j]);
                    }
                }
                dp[i][j] = best;
            }
        }
        return dp[0][n - 1];
    }
}
