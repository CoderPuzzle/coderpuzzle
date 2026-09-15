class Solution {

    public boolean isInterleave(String s1, String s2, String s3) {
        // No interleaving can add or drop letters, so settle the length first.
        int m = s1.length(),
            n = s2.length();
        if (m + n != s3.length()) {
            return false;
        }
        // dp[i][j]: the first i letters of s1 and the first j letters of s2
        // can interleave into the first i + j letters of s3.
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int i = 1; i <= m; ++i) {
            dp[i][0] = dp[i - 1][0] && s1.charAt(i - 1) == s3.charAt(i - 1);
        }
        for (int j = 1; j <= n; ++j) {
            dp[0][j] = dp[0][j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);
        }
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                // The prefix's last letter came from one of the two strings:
                // keep whichever source still has a living reach.
                dp[i][j] =
                    (dp[i - 1][j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) ||
                    (dp[i][j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
            }
        }
        return dp[m][n];
    }
}
