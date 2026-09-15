import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public int countPaths(int[][] grid) {
        final int MOD = 1000000007;
        int m = grid.length,
            n = grid[0].length;
        List<int[]> cells = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) cells.add(new int[] { grid[i][j], i, j });
        }
        // Decreasing value order: when (i, j) is handled, every strictly
        // larger neighbor's dp entry is already final.
        Collections.sort(cells, (x, y) -> Integer.compare(y[0], x[0]));
        // dp[i][j] = number of increasing paths starting at (i, j);
        // 1 accounts for the length-1 path of the cell itself.
        long[][] dp = new long[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) dp[i][j] = 1;
        }
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        for (int[] cell : cells) {
            int v = cell[0],
                i = cell[1],
                j = cell[2];
            for (int[] dir : dirs) {
                int ni = i + dir[0],
                    nj = j + dir[1];
                // Strict '>' skips equal values, so plateau cells never
                // chain (an increasing path can never revisit a cell).
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] > v) {
                    dp[i][j] = (dp[i][j] + dp[ni][nj]) % MOD;
                }
            }
        }
        // A path is identified by its starting cell, so sum dp everywhere.
        long total = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) total = (total + dp[i][j]) % MOD;
        }
        return (int) total;
    }
}
