class Solution {
  public:
    int stoneGameII(vector<int> &piles) {
        int n = piles.size();
        vector<int> suf(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            suf[i] = suf[i + 1] + piles[i];
        }
        // dp[i][m]: max stones the player to move collects from piles[i:]
        // when the current M is m. dp[n][*] = 0.
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));
        for (int i = n - 1; i >= 0; i--) {
            for (int m = 1; m <= n; m++) {
                int limit = min(2 * m, n - i);
                int best = 0;
                for (int x = 1; x <= limit; x++) {
                    int m2 = min(max(m, x), n);
                    // taking x piles hands over (i + x, max(m, x)); the two
                    // players split the whole suffix, so the mover's haul is
                    // the suffix total minus the opponent's optimal dp
                    int cand = suf[i] - dp[i + x][m2];
                    best = max(best, cand);
                }
                dp[i][m] = best;
            }
        }
        return dp[0][1];
    }
};
