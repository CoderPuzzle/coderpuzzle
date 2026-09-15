class Solution {
  public:
    int countPyramids(vector<vector<int>> &grid) { return countDirection(grid, false) + countDirection(grid, true); }

  private:
    int countDirection(const vector<vector<int>> &grid, bool forward) {
        const int rows = static_cast<int>(grid.size());
        const int columns = static_cast<int>(grid[0].size());
        vector<int> towardBase(columns);
        int total = 0;
        for (int offset = 0; offset < rows; ++offset) {
            const int row = forward ? offset : rows - 1 - offset;
            vector<int> current(columns);
            for (int column = 0; column < columns; ++column) {
                if (grid[row][column] == 0) {
                    continue;
                }
                current[column] = 1;
                if (column > 0 && column + 1 < columns && towardBase[column] > 0) {
                    current[column] += min(towardBase[column - 1], towardBase[column + 1]);
                }
                total += current[column] - 1;
            }
            towardBase = move(current);
        }
        return total;
    }
};
