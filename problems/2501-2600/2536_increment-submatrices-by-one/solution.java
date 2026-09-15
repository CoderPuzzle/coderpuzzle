class Solution {

    public int[][] rangeAddQueries(int n, int[][] queries) {
        // 2-D difference trick applied row by row.
        int[][] diff = new int[n][n + 1];
        for (int[] q : queries) {
            for (int r = q[0]; r <= q[2]; r++) {
                diff[r][q[1]] += 1;
                diff[r][q[3] + 1] -= 1;
            }
        }
        int[][] mat = new int[n][n];
        for (int r = 0; r < n; r++) {
            int running = 0;
            for (int c = 0; c < n; c++) {
                running += diff[r][c];
                mat[r][c] = running;
            }
        }
        return mat;
    }
}
