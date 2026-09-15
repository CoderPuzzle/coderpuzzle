class Solution {

    public int[][] construct2DArray(int[] original, int m, int n) {
        if ((long) m * n != original.length) {
            return new int[0][];
        }

        int[][] result = new int[m][n];
        for (int row = 0; row < m; ++row) {
            for (int column = 0; column < n; ++column) {
                result[row][column] = original[row * n + column];
            }
        }
        return result;
    }
}
