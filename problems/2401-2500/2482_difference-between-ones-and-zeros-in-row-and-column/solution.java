class Solution {

    public int[][] onesMinusZeros(int[][] grid) {
        // Precompute each row's and column's one-count once; the zero
        // counts follow as n - onesRow and m - onesCol, collapsing the
        // cell formula to 2*onesRow + 2*onesCol - m - n.
        int m = grid.length;
        int n = grid[0].length;
        int[] rowOnes = new int[m];
        int[] colOnes = new int[n];
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                rowOnes[i] += grid[i][j];
                colOnes[j] += grid[i][j];
            }
        }
        int[][] diff = new int[m][n];
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                diff[i][j] = 2 * rowOnes[i] + 2 * colOnes[j] - m - n;
            }
        }
        return diff;
    }
}
