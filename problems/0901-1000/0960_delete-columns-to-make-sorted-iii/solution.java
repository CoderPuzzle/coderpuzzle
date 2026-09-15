class Solution {

    public int minDeletionSize(String[] strs) {
        int rows = strs.length,
            cols = strs[0].length();
        int[] dp = new int[cols];
        int best = 0;
        for (int j = 0; j < cols; j++) {
            dp[j] = 1;
            for (int i = 0; i < j; i++) {
                boolean ok = true;
                for (int r = 0; r < rows && ok; r++) {
                    // Two kept columns coexist only when no row descends
                    // between them.
                    if (strs[r].charAt(i) > strs[r].charAt(j)) {
                        ok = false;
                    }
                }
                if (ok && dp[i] + 1 > dp[j]) {
                    dp[j] = dp[i] + 1;
                }
            }
            best = Math.max(best, dp[j]);
        }
        return cols - best;
    }
}
