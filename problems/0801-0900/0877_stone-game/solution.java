class Solution {

    public boolean stoneGame(int[] piles) {
        int n = piles.length;
        // dp[i][j] = the best final score difference (mover minus opponent)
        // over piles[i..j]: taking an end scores it and hands the rest
        // over, so the opponent's best difference on the shorter row
        // counts against the taker.
        int[][] dp = new int[n][n];
        for (int i = 0; i < n; ++i) {
            dp[i][i] = piles[i];
        }
        for (int length = 2; length <= n; ++length) {
            for (int i = 0; i + length - 1 < n; ++i) {
                int j = i + length - 1;
                dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        }
        return dp[0][n - 1] > 0;
    }
}
