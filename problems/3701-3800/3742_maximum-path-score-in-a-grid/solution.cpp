class Solution {
  public:
    int maxPathScore(vector<vector<int>> &grid, int k) {
        int m = grid.size(), n = grid[0].size();
        // A path starts on a free cell, so it can charge at most m + n - 2
        // times: budget states beyond min(k, m + n - 2) cannot occur.
        int cap = min(k, m + n - 2);
        const int unreachable = -(1 << 30);
        // dp[j][c]: best score collected on a path ending at column j of the
        // current row with total cost exactly c; unreachable states sit far
        // below every real score. Cell (0, 0) is 0 by the constraints, so it
        // seeds score 0 at cost 0.
        vector<vector<int>> dp(n, vector<int>(cap + 1, unreachable));
        dp[0][0] = 0;
        for (int i = 0; i < m; i++) {
            vector<vector<int>> next(n, vector<int>(cap + 1, unreachable));
            for (int j = 0; j < n; j++) {
                int charge = grid[i][j] ? 1 : 0;
                for (int c = charge; c <= cap; c++) {
                    int best = unreachable;
                    if (dp[j][c - charge] > best) {
                        best = dp[j][c - charge];
                    }
                    if (j > 0 && next[j - 1][c - charge] > best) {
                        best = next[j - 1][c - charge];
                    }
                    if (best > unreachable / 2) {
                        next[j][c] = best + grid[i][j];
                    }
                }
            }
            dp = move(next);
        }
        int best = *max_element(dp[n - 1].begin(), dp[n - 1].end());
        return best >= 0 ? best : -1;
    }
};
