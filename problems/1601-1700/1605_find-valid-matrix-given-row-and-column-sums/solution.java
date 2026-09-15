class Solution {

    public int[][] restoreMatrix(int[] rowSum, int[] colSum) {
        int rows = rowSum.length;
        int cols = colSum.length;
        int[] remainingRow = rowSum.clone();
        int[] remainingCol = colSum.clone();
        int[][] matrix = new int[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int value = Math.min(remainingRow[i], remainingCol[j]);
                matrix[i][j] = value;
                remainingRow[i] -= value;
                remainingCol[j] -= value;
            }
        }
        return matrix;
    }
}
