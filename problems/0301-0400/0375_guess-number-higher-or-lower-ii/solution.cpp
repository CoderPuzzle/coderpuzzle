class Solution {
  public:
    int getMoneyAmount(int n) {
        // dp[i][j] = min money that guarantees finding any number in
        // [i, j]; padded to n+2 so the empty-side reads dp[i][guess-1]
        // and dp[guess+1][j] stay valid (and 0).
        int size = n + 2;
        vector<vector<int>> dp(size, vector<int>(size, 0));
        // Fill by interval length: a range's value depends only on its
        // strictly shorter subranges. Length 1 is free (single candidate).
        for (int length = 2; length <= n; length++) {
            for (int i = 1; i <= n - length + 1; i++) {
                int j = i + length - 1;
                int best = INT_MAX;
                // Minimax: the opponent may hide in the worse side, so
                // guessing g costs g + max(dp of the two remaining sides).
                for (int guess = i; guess <= j; guess++) {
                    int lower = dp[i][guess - 1];
                    int upper = dp[guess + 1][j];
                    int cost = guess + max(lower, upper);
                    if (cost < best)
                        best = cost;
                }
                dp[i][j] = best;
            }
        }
        return dp[1][n];
    }
};
