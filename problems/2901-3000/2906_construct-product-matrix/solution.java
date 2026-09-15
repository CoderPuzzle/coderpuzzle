class Solution {

    public int[][] constructProductMatrix(int[][] grid) {
        // Division is unavailable: 12345 = 3 * 5 * 823 is composite and grid
        // values routinely share factors with it, so there is no modular
        // inverse to divide by. Flatten the matrix in row-major order —
        // excluding grid[i][j] is excluding one position of that sequence —
        // and multiply the prefix (everything before the position) by the
        // suffix (everything after it). Every factor is reduced below 12345
        // first, so each intermediate product stays below 12345^2 and fits
        // comfortably in an int.
        final int MOD = 12345;
        int n = grid.length;
        int m = grid[0].length;
        int total = n * m;
        int[] flat = new int[total];
        int k = 0;
        for (int[] row : grid) {
            for (int v : row) {
                flat[k++] = v % MOD;
            }
        }
        int[] prefix = new int[total + 1];
        int[] suffix = new int[total + 1];
        prefix[0] = 1;
        suffix[total] = 1;
        for (int t = 0; t < total; t++) {
            prefix[t + 1] = (prefix[t] * flat[t]) % MOD;
            suffix[total - 1 - t] = (suffix[total - t] * flat[total - 1 - t]) % MOD;
        }
        int[][] result = new int[n][m];
        k = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                result[i][j] = (prefix[k] * suffix[k + 1]) % MOD;
                k++;
            }
        }
        return result;
    }
}
