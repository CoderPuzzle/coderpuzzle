import java.util.ArrayList;
import java.util.List;

class Solution {

    public int longestIncreasingPath(int[][] matrix) {
        int m = matrix.length,
            n = matrix[0].length;
        List<int[]> cells = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) cells.add(new int[] { matrix[i][j], i, j });
        }
        // Strictly increasing paths make the cells a DAG (edges point to
        // larger neighbors), so ascending value order is a topological order.
        cells.sort((a, b) -> Integer.compare(a[0], b[0]));
        // dp[i][j] = longest increasing path starting at (i, j); 1 = cell alone.
        int[][] dp = new int[m][n];
        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) dp[i][j] = 1;
        int best = 1;
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        for (int[] cell : cells) {
            int v = cell[0],
                i = cell[1],
                j = cell[2];
            // Smaller neighbors appear earlier in the sort, so their dp is
            // final; strict < so equal-valued neighbors never link.
            for (int[] d : dirs) {
                int ni = i + d[0],
                    nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] < v) {
                    if (dp[ni][nj] + 1 > dp[i][j]) dp[i][j] = dp[ni][nj] + 1;
                }
            }
            if (dp[i][j] > best) best = dp[i][j];
        }
        return best;
    }
}
