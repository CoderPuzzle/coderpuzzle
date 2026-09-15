class Solution {

    // Four prefix tables; per-window line sums are O(1).
    public int largestMagicSquare(int[][] grid) {
        int m = grid.length,
            n = grid[0].length;
        long[][] rs = new long[m + 1][n + 1];
        long[][] cs = new long[m + 1][n + 1];
        long[][] d1 = new long[m + 1][n + 2];
        long[][] a2 = new long[m + 1][n + 2];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                long v = grid[i - 1][j - 1];
                rs[i][j] = rs[i][j - 1] + v;
                cs[i][j] = cs[i - 1][j] + v;
                d1[i][j] = v + d1[i - 1][j - 1];
            }
        }
        for (int i = 1; i <= m; i++) {
            for (int j = n; j >= 1; j--) {
                a2[i][j] = grid[i - 1][j - 1] + a2[i - 1][j + 1];
            }
        }
        for (int k = Math.min(m, n); k >= 1; k--) {
            for (int i = 0; i + k <= m; i++) {
                for (int j = 0; j + k <= n; j++) {
                    long s = rs[i + 1][j + k] - rs[i + 1][j];
                    boolean ok = true;
                    for (int t = 1; t < k && ok; t++) {
                        ok = rs[i + t + 1][j + k] - rs[i + t + 1][j] == s;
                    }
                    for (int t = 0; t < k && ok; t++) {
                        ok = cs[i + k][j + t + 1] - cs[i][j + t + 1] == s;
                    }
                    if (ok && d1[i + k][j + k] - d1[i][j] != s) ok = false;
                    if (ok && a2[i + k][j + 1] - a2[i][j + 1 + k] != s) ok = false;
                    if (ok) {
                        return k;
                    }
                }
            }
        }
        return 1;
    }
}
