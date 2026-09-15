class Solution {

    public int stoneGameII(int[] piles) {
        int n = piles.length;
        int[] suf = new int[n + 1];
        for (int i = n - 1; i >= 0; i--) {
            suf[i] = suf[i + 1] + piles[i];
        }
        // dp[i][m]: max stones the player to move collects from piles[i:]
        // when the current M is m. dp[n][*] = 0.
        int[][] dp = new int[n + 1][n + 1];
        for (int i = n - 1; i >= 0; i--) {
            for (int m = 1; m <= n; m++) {
                int limit = Math.min(2 * m, n - i);
                int best = 0;
                for (int x = 1; x <= limit; x++) {
                    int m2 = Math.min(Math.max(m, x), n);
                    // taking x piles hands over (i + x, max(m, x)); the two
                    // players split the whole suffix, so the mover's haul is
                    // the suffix total minus the opponent's optimal dp
                    int cand = suf[i] - dp[i + x][m2];
                    if (cand > best) {
                        best = cand;
                    }
                }
                dp[i][m] = best;
            }
        }
        return dp[0][1];
    }
}
