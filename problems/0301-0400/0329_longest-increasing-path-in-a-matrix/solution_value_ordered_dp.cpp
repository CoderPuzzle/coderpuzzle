class Solution {
  public:
    int longestIncreasingPath(vector<vector<int>> &matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<array<int, 3>> cells;
        cells.reserve((size_t)m * n);
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++)
                cells.push_back({matrix[i][j], i, j});
        }
        // Strictly increasing paths make the cells a DAG (edges point to
        // larger neighbors), so ascending value order is a topological order.
        sort(cells.begin(), cells.end());
        // dp[i][j] = longest increasing path starting at (i, j); 1 = cell alone.
        vector<vector<int>> dp(m, vector<int>(n, 1));
        int best = 1;
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (auto &[v, i, j] : cells) {
            // Smaller neighbors appear earlier in the sort, so their dp is
            // final; strict < so equal-valued neighbors never link.
            for (auto &d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] < v) {
                    if (dp[ni][nj] + 1 > dp[i][j])
                        dp[i][j] = dp[ni][nj] + 1;
                }
            }
            best = max(best, dp[i][j]);
        }
        return best;
    }
};
