class Solution {

    public int longestLine(int[][] mat) {
        // Scan row by row; prev[j] holds the four run lengths that end at
        // cell (i - 1, j): horizontal, vertical, diagonal, anti-diagonal.
        int m = mat.length,
            n = mat[0].length;
        int[][] prev = new int[n][4];
        int best = 0;
        for (int i = 0; i < m; ++i) {
            int[][] cur = new int[n][4];
            for (int j = 0; j < n; ++j) {
                if (mat[i][j] == 1) {
                    // Horizontal: extend the run arriving from the left.
                    cur[j][0] = (j > 0 ? cur[j - 1][0] : 0) + 1;
                    // Vertical: extend the run arriving from above.
                    cur[j][1] = prev[j][1] + 1;
                    // Diagonal: extend the run arriving from up-left.
                    cur[j][2] = (j > 0 ? prev[j - 1][2] : 0) + 1;
                    // Anti-diagonal: extend the run arriving from up-right.
                    cur[j][3] = (j + 1 < n ? prev[j + 1][3] : 0) + 1;
                    for (int run : cur[j]) {
                        best = Math.max(best, run);
                    }
                }
            }
            prev = cur;
        }
        return best;
    }
}
