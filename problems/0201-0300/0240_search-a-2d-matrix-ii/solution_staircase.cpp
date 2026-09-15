class Solution {
  public:
    bool searchMatrix(vector<vector<int>> &matrix, int target) {
        if (matrix.empty() || matrix[0].empty())
            return false;
        // Start at the top-right corner: largest in its row and smallest in
        // its column, so one comparison eliminates a whole row or column.
        int row = 0, col = matrix[0].size() - 1;
        while (row < (int)matrix.size() && col >= 0) {
            int value = matrix[row][col];
            if (value == target)
                return true;
            // Everything below in this column is even larger, so discard
            // the whole column by moving left.
            if (value > target)
                --col;
            else
                // Everything to the left in this row is even smaller, so
                // discard the whole row by moving down.
                ++row;
        }
        // Fell off the left or bottom edge: nothing plausible remains, so
        // the target is absent — after at most m + n - 1 staircase steps.
        return false;
    }
};
