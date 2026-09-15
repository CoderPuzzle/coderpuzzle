class Solution {
  public:
    int minTotalDistance(vector<vector<int>> &grid) {
        // A row-major sweep collects the row indexes already sorted; a
        // column-major sweep does the same for the column indexes, so
        // neither axis needs an explicit sort.
        vector<int> rows, cols;
        for (int r = 0; r < (int)grid.size(); ++r) {
            for (int c = 0; c < (int)grid[r].size(); ++c) {
                if (grid[r][c] == 1) {
                    rows.push_back(r);
                }
            }
        }
        for (int c = 0; c < (int)grid[0].size(); ++c) {
            for (int r = 0; r < (int)grid.size(); ++r) {
                if (grid[r][c] == 1) {
                    cols.push_back(c);
                }
            }
        }
        // Manhattan distance adds the two axes independently, and on a line a
        // median of the coordinates minimizes the sum of absolute differences
        // — so the answer is the two spreads around the two medians.
        int rowPivot = rows[rows.size() / 2];
        int colPivot = cols[cols.size() / 2];
        int total = 0;
        // With an even count, every index between the two middle ones ties
        // for the minimum; the upper middle is as good as any.
        for (int r : rows) {
            total += abs(r - rowPivot);
        }
        for (int c : cols) {
            total += abs(c - colPivot);
        }
        return total;
    }
};
