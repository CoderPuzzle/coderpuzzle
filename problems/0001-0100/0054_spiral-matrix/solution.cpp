class Solution {
  public:
    vector<int> spiralOrder(vector<vector<int>> &matrix) {
        // Boundary-shrinking walk: emit the ring of the matrix that is left —
        // top row, right column, bottom row, left column — then shrink every
        // boundary inward by one and repeat until every element is emitted.
        int rows = matrix.size(), columns = matrix[0].size();
        int top = 0, bottom = rows - 1, left = 0, right = columns - 1;
        vector<int> order;
        while ((int)order.size() < rows * columns) {
            for (int column = left; column <= right; ++column) {
                order.push_back(matrix[top][column]);
            }
            for (int row = top + 1; row <= bottom; ++row) {
                order.push_back(matrix[row][right]);
            }
            if (top != bottom) {
                // Leftwards along the bottom row, stopping before the corner
                // the right-column run already emitted.
                for (int column = right - 1; column >= left; --column) {
                    order.push_back(matrix[bottom][column]);
                }
            }
            if (left != right) {
                // Upwards along the left column, stopping before the corner
                // the top-row run already emitted.
                for (int row = bottom - 1; row > top; --row) {
                    order.push_back(matrix[row][left]);
                }
            }
            ++top;
            --bottom;
            ++left;
            --right;
        }
        return order;
    }
};
