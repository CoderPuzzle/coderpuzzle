class Solution {

    public int[][] transpose(int[][] matrix) {
        // The transpose swaps indices: the entry at (i, j) moves to (j, i),
        // so every input row reappears as an output column. A non-square
        // input changes shape — m x n becomes n x m — so the result is a
        // fresh grid, never an in-place rewrite.
        int m = matrix.length;
        int n = matrix[0].length;
        int[][] result = new int[n][m];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                result[j][i] = matrix[i][j];
            }
        }
        return result;
    }
}
