class Solution {

    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        // dp row for the empty prefix of text1 (all zeros); each new row only
        // reads the row above, so two rows suffice
        int[] prev = new int[n + 1];
        int[] curr = new int[n + 1];
        for (int i = 1; i <= m; i++) {
            char c = text1.charAt(i - 1);
            for (int j = 1; j <= n; j++) {
                if (c == text2.charAt(j - 1)) {
                    // aligning matching last chars is always safe: extend
                    // the LCS of both shorter prefixes
                    curr[j] = prev[j - 1] + 1;
                } else {
                    // an optimal LCS discards at least one of the two
                    // characters, so take the better of dropping either
                    curr[j] = Math.max(prev[j], curr[j - 1]);
                }
            }
            // curr becomes the previous row for the next i
            int[] tmp = prev;
            prev = curr;
            curr = tmp;
        }
        return prev[n];
    }
}
