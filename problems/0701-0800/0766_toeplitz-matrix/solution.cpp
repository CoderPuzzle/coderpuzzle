class Solution {
  public:
    bool isToeplitzMatrix(vector<vector<int>> &matrix) {
        // A diagonal from top-left to bottom-right is constant exactly
        // when every cell equals its top-left neighbor — that neighbor is
        // the previous cell of the same diagonal, so a break anywhere on
        // a diagonal surfaces as one failed neighbor check. Cells in row
        // 0 and column 0 start their diagonals and have no top-left
        // neighbor, so the sweep opens at row 1, column 1.
        for (int r = 1; r < matrix.size(); ++r) {
            for (int c = 1; c < matrix[r].size(); ++c) {
                if (matrix[r][c] != matrix[r - 1][c - 1]) {
                    return false;
                }
            }
        }
        return true;
    }
};
