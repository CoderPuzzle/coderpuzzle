class Solution {
  public:
    int countPaths(vector<vector<int>> &grid) {
        const long long MOD = 1000000007LL;
        int m = grid.size(), n = grid[0].size();
        vector<array<int, 3>> cells;
        cells.reserve((long long)m * n);
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++)
                cells.push_back({grid[i][j], i, j});
        }
        // Decreasing value order: when (i, j) is handled, every strictly
        // larger neighbor's dp entry is already final.
        sort(cells.begin(), cells.end(), [](const array<int, 3> &x, const array<int, 3> &y) { return x[0] > y[0]; });
        // dp[i][j] = number of increasing paths starting at (i, j);
        // 1 accounts for the length-1 path of the cell itself.
        vector<vector<long long>> dp(m, vector<long long>(n, 1));
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (auto &cell : cells) {
            int v = cell[0], i = cell[1], j = cell[2];
            for (auto &dir : dirs) {
                int ni = i + dir[0], nj = j + dir[1];
                // Strict '>' skips equal values, so plateau cells never
                // chain (an increasing path can never revisit a cell).
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] > v) {
                    dp[i][j] = (dp[i][j] + dp[ni][nj]) % MOD;
                }
            }
        }
        // A path is identified by its starting cell, so sum dp everywhere.
        long long total = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++)
                total = (total + dp[i][j]) % MOD;
        }
        return (int)total;
    }
};
