class Solution {

    public long sellingWood(int m, int n, int[][] prices) {
        // Dense price table: 0 where a shape is unsold, max on duplicates.
        long[][] price = new long[m + 1][n + 1];
        for (int[] p : prices) {
            if (price[p[0]][p[1]] < p[2]) price[p[0]][p[1]] = p[2];
        }
        // dp[i][j] = best revenue from an i x j piece: sell whole, or one
        // horizontal / vertical first cut with both halves solved
        // independently. Increasing i then j keeps every subproblem ready.
        long[][] dp = new long[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                // Selling whole is the default a cut must beat.
                long best = price[i][j];
                long[] row = dp[i];
                // Horizontal cuts: only up to the midpoint — the symmetric
                // i-h split need not be retried. Earlier rows are final.
                for (int h = 1; h <= i / 2; h++) {
                    long v = dp[h][j] + dp[i - h][j];
                    if (v > best) best = v;
                }
                // Vertical cuts: earlier columns of the current row.
                for (int w = 1; w <= j / 2; w++) {
                    long v = row[w] + row[j - w];
                    if (v > best) best = v;
                }
                dp[i][j] = best;
            }
        }
        return dp[m][n];
    }
}
