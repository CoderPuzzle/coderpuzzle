class Solution {
  public:
    vector<vector<int>> rotate(vector<vector<int>> &matrix) {
        // A clockwise quarter turn factors into two swap-only involutions:
        // transpose across the main diagonal, then reverse every row.
        int n = matrix.size();
        // The strict upper triangle holds each transpose pair exactly once;
        // walking the full square would swap every pair twice and undo itself.
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        // Column j of the transpose reads row j of the input, so reversing
        // each row lays it out bottom-up — precisely the quarter turn.
        for (auto &row : matrix) {
            reverse(row.begin(), row.end());
        }
        // The rotation happened inside the input allocation; the same matrix,
        // now rotated, is what the judge compares.
        return matrix;
    }
};
