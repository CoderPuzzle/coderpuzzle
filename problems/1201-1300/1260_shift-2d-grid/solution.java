class Solution {

    public int[][] shiftGrid(int[][] grid, int k) {
        int m = grid.length,
            n = grid[0].length;
        int total = m * n;
        k %= total;
        // One shift = a cyclic right-rotation of the flattened grid.
        int[] shifted = new int[total];
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                shifted[(r * n + c + k) % total] = grid[r][c];
            }
        }
        int[][] result = new int[m][n];
        for (int i = 0; i < total; ++i) {
            result[i / n][i % n] = shifted[i];
        }
        return result;
    }
}
