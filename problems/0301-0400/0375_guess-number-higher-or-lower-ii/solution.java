class Solution {

    public int getMoneyAmount(int n) {
        // dp[i][j] = min money that guarantees finding any number in
        // [i, j]; padded to n+2 so the empty-side reads below stay valid.
        int size = n + 2;
        int[][] dp = new int[size][size];
        // Fill by interval length: a range's value depends only on its
        // strictly shorter subranges. Length 1 is free (single candidate).
        for (int length = 2; length <= n; length++) {
            for (int i = 1; i <= n - length + 1; i++) {
                int j = i + length - 1;
                int best = Integer.MAX_VALUE;
                // Minimax: the opponent may hide in the worse side, so
                // guessing g costs g + max(dp of the two remaining sides).
                for (int guess = i; guess <= j; guess++) {
                    // dp[i][0] and dp[n+1][j] are out of the triangle but stay 0.
                    int lower = i <= guess - 1 ? dp[i][guess - 1] : 0;
                    int upper = guess + 1 <= j ? dp[guess + 1][j] : 0;
                    int cost = guess + Math.max(lower, upper);
                    if (cost < best) best = cost;
                }
                dp[i][j] = best;
            }
        }
        return dp[1][n];
    }
}
