class Solution {

    public int[][] rotate(int[][] matrix) {
        // A clockwise quarter turn factors into two swap-only involutions:
        // transpose across the main diagonal, then reverse every row.
        int n = matrix.length;
        // The strict upper triangle holds each transpose pair exactly once;
        // walking the full square would swap every pair twice and undo itself.
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Column j of the transpose reads row j of the input, so reversing
        // each row lays it out bottom-up — precisely the quarter turn.
        for (int[] row : matrix) {
            for (int lo = 0, hi = n - 1; lo < hi; ++lo, --hi) {
                int temp = row[lo];
                row[lo] = row[hi];
                row[hi] = temp;
            }
        }
        // The rotation happened inside the input allocation; the same matrix,
        // now rotated, is what the judge compares.
        return matrix;
    }
}
