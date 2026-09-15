class Solution {

    public int longestPalindromeSubseq(String s) {
        // Interval DP keyed by the outermost pair's letter: dp[l][r][c] is
        // the longest good palindromic subsequence inside s[l..r] whose
        // first and last characters are both c; nesting a pair around an
        // inner one requires the two letters to differ.
        int n = s.length();
        int[][][] dp = new int[n][n][26];
        for (int l = n - 2; l >= 0; l--) {
            for (int r = l + 1; r < n; r++) {
                int[] cur = dp[l][r];
                for (int c = 0; c < 26; c++) {
                    cur[c] = Math.max(dp[l][r - 1][c], dp[l + 1][r][c]);
                }
                if (s.charAt(l) == s.charAt(r)) {
                    int c0 = s.charAt(l) - 'a';
                    int[] inner = dp[l + 1][r - 1];
                    // Best inner length avoiding the outer letter: the row
                    // maximum when it peaks elsewhere, the best of the other
                    // 25 letters when the row peaks exactly at c0.
                    int best1 = -1;
                    int best2 = -1;
                    int arg1 = 0;
                    for (int c = 0; c < 26; c++) {
                        int v = inner[c];
                        if (v > best1) {
                            best2 = best1;
                            best1 = v;
                            arg1 = c;
                        } else if (v > best2) {
                            best2 = v;
                        }
                    }
                    int best = arg1 == c0 ? best2 : best1;
                    if (2 + best > cur[c0]) {
                        cur[c0] = 2 + best;
                    }
                }
            }
        }
        int answer = 0;
        for (int c = 0; c < 26; c++) {
            answer = Math.max(answer, dp[0][n - 1][c]);
        }
        return answer;
    }
}
