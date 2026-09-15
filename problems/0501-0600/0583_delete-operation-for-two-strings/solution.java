class Solution {

    public int minDistance(String word1, String word2) {
        final char[] a = word1.toCharArray();
        final char[] b = word2.toCharArray();
        final int la = a.length,
            lb = b.length;
        // dp[i][j] = LCS length of the first i chars of a and first j of b; row/col 0 stay 0.
        int[][] dp = new int[la + 1][lb + 1];
        for (int i = 1; i <= la; i++) {
            for (int j = 1; j <= lb; j++) {
                if (a[i - 1] == b[j - 1]) {
                    // Matching chars extend the diagonal prefix by one.
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    // Drop the last char of one string and carry the better result forward.
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        // Keep the LCS, delete everything else from both words.
        return la + lb - 2 * dp[la][lb];
    }
}
