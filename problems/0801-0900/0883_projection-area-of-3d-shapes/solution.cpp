class Solution {
  public:
    int projectionArea(vector<vector<int>> &grid) {
        // The three projections never interact: the top view counts nonzero
        // cells, the other two are silhouettes of row and column maxima.
        // One row-major sweep banks the footprint and each row's tallest
        // tower; a second sweep collects the column maxima.
        int n = grid.size();
        int total = 0;
        for (const auto &row : grid) {
            int tallest = 0;
            for (int v : row) {
                if (v != 0) {
                    ++total;
                }
                if (v > tallest) {
                    tallest = v;
                }
            }
            total += tallest;
        }
        for (int j = 0; j < n; ++j) {
            int tallest = 0;
            for (const auto &row : grid) {
                if (row[j] > tallest) {
                    tallest = row[j];
                }
            }
            total += tallest;
        }
        return total;
    }
};
