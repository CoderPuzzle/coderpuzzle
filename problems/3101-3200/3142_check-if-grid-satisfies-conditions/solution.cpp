class Solution {
  public:
    bool satisfiesConditions(vector<vector<int>> &grid) {
        // A grid meets both conditions exactly when every column is
        // constant and neighbouring columns differ. Once a column is
        // verified constant, comparing just its top cell with the next
        // column's top cell polices every vertical pair of the horizontal
        // rule at once, so one column-wise sweep suffices.
        for (size_t j = 0; j < grid[0].size(); ++j) {
            for (size_t i = 1; i < grid.size(); ++i) {
                if (grid[i][j] != grid[0][j]) {
                    return false;
                }
            }
            if (j + 1 < grid[0].size() && grid[0][j] == grid[0][j + 1]) {
                return false;
            }
        }
        return true;
    }
};
