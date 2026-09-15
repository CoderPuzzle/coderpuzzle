class Solution {
  public:
    bool checkXMatrix(vector<vector<int>> &grid) {
        int size = static_cast<int>(grid.size());
        for (int row = 0; row < size; ++row) {
            for (int col = 0; col < size; ++col) {
                if (row == col || row + col == size - 1) {
                    if (grid[row][col] == 0) {
                        return false;
                    }
                } else if (grid[row][col] != 0) {
                    return false;
                }
            }
        }
        return true;
    }
};
