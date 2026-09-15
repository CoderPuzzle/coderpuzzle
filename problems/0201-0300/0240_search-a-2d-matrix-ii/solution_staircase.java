class Solution {

    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;
        // Start at the top-right corner: largest in its row and smallest in
        // its column, so one comparison eliminates a whole row or column.
        int row = 0,
            col = matrix[0].length - 1;
        while (row < matrix.length && col >= 0) {
            int value = matrix[row][col];
            if (value == target) return true;
            // Too big: everything below in this column is even larger, so
            // discard the column by moving left. Too small: everything to
            // the left in this row is even smaller, so discard the row.
            if (value > target) col--;
            else row++;
        }
        // Fell off the left or bottom edge: nothing plausible remains —
        // after at most m + n - 1 staircase steps.
        return false;
    }
}
