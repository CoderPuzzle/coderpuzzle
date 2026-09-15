class Solution {
  public:
    int minPathSum(vector<vector<int>> &grid) {
        // The grid doubles as the DP table: after the scan, grid[i][j] holds
        // not the cell's own value but the cheapest path sum from (0, 0)
        // reaching it, so no second table is ever allocated.
        int m = grid.size();
        int n = grid[0].size();
        // The first row and the first column have a single predecessor each,
        // so their running sums are plain prefixes along that row/column.
        for (int j = 1; j < n; ++j) {
            grid[0][j] += grid[0][j - 1];
        }
        for (int i = 1; i < m; ++i) {
            grid[i][0] += grid[i - 1][0];
            for (int j = 1; j < n; ++j) {
                // Cheapest sum ending at (i, j) = the cell's own value plus
                // the smaller of the sums already sitting above and left.
                grid[i][j] += min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        return grid[m - 1][n - 1];
    }
};
