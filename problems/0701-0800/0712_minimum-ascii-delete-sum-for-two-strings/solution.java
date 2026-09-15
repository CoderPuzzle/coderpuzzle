class Solution {

    public int minimumDeleteSum(String s1, String s2) {
        final char[] a = s1.toCharArray();
        final char[] b = s2.toCharArray();
        final int la = a.length,
            lb = b.length;
        // dp[i][j] = min deleted-ASCII cost of equalizing the prefixes a[:i], b[:j].
        int[][] dp = new int[la + 1][lb + 1];
        // Base row/column: matching against the empty string deletes everything.
        for (int j = 1; j <= lb; j++) {
            dp[0][j] = dp[0][j - 1] + b[j - 1];
        }
        for (int i = 1; i <= la; i++) {
            dp[i][0] = dp[i - 1][0] + a[i - 1];
            for (int j = 1; j <= lb; j++) {
                if (a[i - 1] == b[j - 1]) {
                    // Equal chars are both kept — free reduction to shorter prefixes.
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    // A mismatch can retain at most one end: pay its ASCII value.
                    dp[i][j] = Math.min(dp[i - 1][j] + a[i - 1], dp[i][j - 1] + b[j - 1]);
                }
            }
        }
        return dp[la][lb];
    }
}
