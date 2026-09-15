class Solution {

    public boolean isValidPalindrome(String s, int k) {
        int n = s.length();
        if (n == 0) return true;
        // Reformulation: deleting <= k chars to leave a palindrome is the same
        // as keeping a palindromic subsequence of length >= n - k.
        int[][] dp = new int[n][n];
        // dp[i][j] = LPS length of s[i..j]; filling i right-to-left means every
        // strictly smaller interval used below is already computed.
        for (int i = n - 1; i >= 0; i--) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; j++) {
                if (s.charAt(i) == s.charAt(j)) {
                    // Matching ends wrap around whatever is best inside.
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    // Ends differ: discard one of them, keep the better shrunk interval.
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        // Turn the kept-subsequence length back into a deletion count.
        return n - dp[0][n - 1] <= k;
    }
}
