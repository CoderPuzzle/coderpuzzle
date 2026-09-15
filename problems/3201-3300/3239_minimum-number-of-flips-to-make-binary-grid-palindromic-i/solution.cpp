class Solution {
  public:
    int minFlips(vector<vector<int>> &grid) {
        // Each mirrored pair that disagrees costs exactly one flip; agreeing
        // pairs and any middle cell never do.
        int m = grid.size(), n = grid[0].size();
        int rows = 0, cols = 0;
        for (const auto &row : grid) {
            for (int lo = 0, hi = n - 1; lo < hi; ++lo, --hi) {
                if (row[lo] != row[hi])
                    ++rows;
            }
        }
        for (int j = 0; j < n; ++j) {
            for (int lo = 0, hi = m - 1; lo < hi; ++lo, --hi) {
                if (grid[lo][j] != grid[hi][j])
                    ++cols;
            }
        }
        return min(rows, cols);
    }
};
