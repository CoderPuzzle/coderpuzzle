class Solution {
  public:
    bool canPartitionGrid(vector<vector<int>> &grid) {
        // One cut splits the grid into a run of whole rows or whole
        // columns, so scan run-prefix sums for total / 2. Totals reach
        // 1e5 cells x 1e5 = 1e10 — sums must be long long, not int.
        int m = grid.size(), n = grid[0].size();
        long long total = 0;
        for (auto &row : grid)
            for (int v : row)
                total += v;
        if (total % 2)
            return false;
        long long half = total / 2, prefix = 0;
        for (int r = 0; r < m - 1; r++) {
            for (int v : grid[r])
                prefix += v;
            if (prefix == half)
                return true;
        }
        prefix = 0;
        for (int c = 0; c < n - 1; c++) {
            for (auto &row : grid)
                prefix += row[c];
            if (prefix == half)
                return true;
        }
        return false;
    }
};
