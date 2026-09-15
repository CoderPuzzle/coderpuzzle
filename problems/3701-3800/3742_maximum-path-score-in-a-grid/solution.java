import java.util.Arrays;

class Solution {

    public int maxPathScore(int[][] grid, int k) {
        int m = grid.length,
            n = grid[0].length;
        // A path starts on a free cell, so it can charge at most m + n - 2
        // times: budget states beyond min(k, m + n - 2) cannot occur.
        int cap = Math.min(k, m + n - 2);
        final int unreachable = -(1 << 30);
        // dp[j][c]: best score collected on a path ending at column j of the
        // current row with total cost exactly c; unreachable states sit far
        // below every real score. Cell (0, 0) is 0 by the constraints, so it
        // seeds score 0 at cost 0.
        int[][] dp = new int[n][cap + 1];
        for (int[] column : dp) {
            Arrays.fill(column, unreachable);
        }
        dp[0][0] = 0;
        for (int i = 0; i < m; i++) {
            int[][] next = new int[n][cap + 1];
            for (int[] column : next) {
                Arrays.fill(column, unreachable);
            }
            for (int j = 0; j < n; j++) {
                int charge = grid[i][j] > 0 ? 1 : 0;
                for (int c = charge; c <= cap; c++) {
                    int best = unreachable;
                    if (dp[j][c - charge] > best) {
                        best = dp[j][c - charge];
                    }
                    if (j > 0 && next[j - 1][c - charge] > best) {
                        best = next[j - 1][c - charge];
                    }
                    if (best > unreachable / 2) {
                        next[j][c] = best + grid[i][j];
                    }
                }
            }
            dp = next;
        }
        int best = Integer.MIN_VALUE;
        for (int state : dp[n - 1]) {
            best = Math.max(best, state);
        }
        return best >= 0 ? best : -1;
    }
}
