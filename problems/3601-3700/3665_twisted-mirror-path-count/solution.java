import java.util.Arrays;

class Solution {

    public int uniquePaths(int[][] grid) {
        int m = grid.length,
            n = grid[0].length;
        final int MOD = 1_000_000_007;
        // Landing tables for mirror cells: entering a mirror while moving
        // right (br) turns the move down, while moving down (bd) turns it
        // right; -1 marks a chain that leaves the grid. Each deflection
        // lands one row below or one column right of the mirror hit, so a
        // reverse row-major sweep resolves every chain against entries
        // that are already final.
        int[] br = new int[m * n];
        int[] bd = new int[m * n];
        Arrays.fill(br, -1);
        Arrays.fill(bd, -1);
        for (int i = m - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                if (grid[i][j] == 0) continue;
                int t = i * n + j;
                if (i + 1 < m) br[t] = grid[i + 1][j] == 0 ? t + n : bd[t + n];
                if (j + 1 < n) bd[t] = grid[i][j + 1] == 0 ? t + 1 : br[t + 1];
            }
        }
        // dp[k] counts the ways to stand on cell k. Every jump lands in a
        // strictly later row than the cell it leaves, so one row-major sweep
        // settles each cell before any descendant reads it.
        long[] dp = new long[m * n];
        dp[0] = 1;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                long v = dp[i * n + j];
                if (v == 0) continue;
                if (j + 1 < n) {
                    int t = i * n + j + 1;
                    int tgt = grid[i][j + 1] == 0 ? t : br[t];
                    if (tgt >= 0) dp[tgt] = (dp[tgt] + v) % MOD;
                }
                if (i + 1 < m) {
                    int t = (i + 1) * n + j;
                    int tgt = grid[i + 1][j] == 0 ? t : bd[t];
                    if (tgt >= 0) dp[tgt] = (dp[tgt] + v) % MOD;
                }
            }
        }
        return (int) dp[m * n - 1];
    }
}
