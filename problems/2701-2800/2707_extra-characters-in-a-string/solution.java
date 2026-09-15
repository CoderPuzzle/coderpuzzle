import java.util.Arrays;

class Solution {

    // dp[i] holds the fewest extra characters left over after breaking the
    // prefix s[0:i] optimally; dp[0] is the empty prefix.
    public int minExtraChar(String s, String[] dictionary) {
        int n = s.length();
        int[] dp = new int[n + 1];
        Arrays.fill(dp, n + 1);
        dp[0] = 0;
        for (int i = 0; i < n; ++i) {
            // skip move: leave s.charAt(i) as an extra character
            if (dp[i] + 1 < dp[i + 1]) {
                dp[i + 1] = dp[i] + 1;
            }
            // match moves: a word starting at i jumps to i + word.length()
            for (String word : dictionary) {
                int j = i + word.length();
                if (j <= n && s.startsWith(word, i) && dp[i] < dp[j]) {
                    dp[j] = dp[i];
                }
            }
        }
        return dp[n];
    }
}
