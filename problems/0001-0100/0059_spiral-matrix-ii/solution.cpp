class Solution {
  public:
    vector<vector<int>> generateMatrix(int n) {
        // Boundary-shrinking walk: fill the ring of the matrix that is left —
        // top row, right column, bottom row, left column — with the next run of
        // consecutive values, then shrink every boundary inward by one and
        // repeat until every cell is written.
        vector<vector<int>> matrix(n, vector<int>(n, 0));
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        int value = 1;
        while (value <= n * n) {
            for (int column = left; column <= right; ++column) {
                matrix[top][column] = value++;
            }
            for (int row = top + 1; row <= bottom; ++row) {
                matrix[row][right] = value++;
            }
            if (top != bottom) {
                // Leftwards along the bottom row, stopping before the corner
                // the right-column run already filled.
                for (int column = right - 1; column >= left; --column) {
                    matrix[bottom][column] = value++;
                }
            }
            if (left != right) {
                // Upwards along the left column, stopping before the corner
                // the top-row run already filled.
                for (int row = bottom - 1; row > top; --row) {
                    matrix[row][left] = value++;
                }
            }
            ++top;
            --bottom;
            ++left;
            --right;
        }
        return matrix;
    }
};
