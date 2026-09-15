class Solution {
  public:
    int minimumOperations(vector<vector<int>> &grid) {
        // Columns are independent: a cell only has to top the cell directly
        // above it, so one top-to-bottom sweep settles everything. Raising
        // each cell to exactly one above the cell above is the pointwise
        // minimum final column, so no cheaper fix exists.
        vector<int> previous(grid[0]);
        int operations = 0;
        for (int i = 1; i < (int)grid.size(); ++i) {
            for (int j = 0; j < (int)grid[i].size(); ++j) {
                if (grid[i][j] <= previous[j]) {
                    operations += previous[j] + 1 - grid[i][j];
                    previous[j] += 1;
                } else {
                    previous[j] = grid[i][j];
                }
            }
        }
        return operations;
    }
};
