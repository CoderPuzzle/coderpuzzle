class Solution {
  public:
    long long sellingWood(int m, int n, vector<vector<int>> &prices) {
        // Dense price table: 0 where a shape is unsold, max on duplicates.
        vector<vector<long long>> price(m + 1, vector<long long>(n + 1, 0));
        for (auto &p : prices) {
            if (price[p[0]][p[1]] < p[2])
                price[p[0]][p[1]] = p[2];
        }
        // dp[i][j] = best revenue from an i x j piece: sell whole, or one
        // horizontal / vertical first cut with both halves solved
        // independently. Increasing i then j keeps every subproblem ready.
        vector<vector<long long>> dp(m + 1, vector<long long>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                // Selling whole is the default a cut must beat.
                long long best = price[i][j];
                auto &row = dp[i];
                // Horizontal cuts: only up to the midpoint — the symmetric
                // i-h split need not be retried. Earlier rows are final.
                for (int h = 1; h <= i / 2; h++) {
                    long long v = dp[h][j] + dp[i - h][j];
                    if (v > best)
                        best = v;
                }
                // Vertical cuts: earlier columns of the current row.
                for (int w = 1; w <= j / 2; w++) {
                    long long v = row[w] + row[j - w];
                    if (v > best)
                        best = v;
                }
                dp[i][j] = best;
            }
        }
        return dp[m][n];
    }
};
