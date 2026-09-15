class Solution {

    public int longestPalindrome(String word1, String word2) {
        int n1 = word1.length();
        String s = word1 + word2;
        int n = s.length();
        // dp[i][j] holds the longest palindromic subsequence of s[i..j];
        // i descends and j ascends so both dependencies are ready.
        int[][] dp = new int[n + 1][n + 1];
        int best = 0;
        for (int i = n - 1; i >= 0; --i) {
            dp[i][i] = 1;
            char si = s.charAt(i);
            for (int j = i + 1; j < n; ++j) {
                if (si == s.charAt(j)) {
                    int length = dp[i + 1][j - 1] + 2;
                    dp[i][j] = length;
                    // Equal ends straddling the boundary mean both words
                    // contribute at least one character of the palindrome.
                    if (i < n1 && j >= n1 && length > best) best = length;
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        return best;
    }
}
