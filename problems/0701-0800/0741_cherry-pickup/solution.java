import java.util.Arrays;

class Solution {

    public int cherryPickup(int[][] grid) {
        int n = grid.length;
        // dp[r1][r2]: best cherries with walker 1 at (r1, t-r1) and walker 2 at
        // (r2, t-r2) after t steps; -1 marks unreachable states.
        int[][] dp = new int[n][n];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        dp[0][0] = grid[0][0];
        for (int t = 1; t <= 2 * n - 2; t++) {
            int[][] ndp = new int[n][n];
            for (int[] row : ndp) {
                Arrays.fill(row, -1);
            }
            int lo = Math.max(0, t - n + 1),
                hi = Math.min(n - 1, t);
            for (int r1 = lo; r1 <= hi; r1++) {
                int c1 = t - r1;
                if (grid[r1][c1] == -1) {
                    continue;
                }
                for (int r2 = r1; r2 <= hi; r2++) {
                    int c2 = t - r2;
                    if (grid[r2][c2] == -1) {
                        continue;
                    }
                    int best = -1;
                    for (int pr1 = r1 - 1; pr1 <= r1; pr1++) {
                        for (int pr2 = r2 - 1; pr2 <= r2; pr2++) {
                            if (pr1 >= 0 && pr1 < n && pr2 >= 0 && pr2 < n) {
                                best = Math.max(best, dp[pr1][pr2]);
                            }
                        }
                    }
                    if (best < 0) {
                        continue;
                    }
                    int gain = grid[r1][c1] + (r1 != r2 ? grid[r2][c2] : 0);
                    ndp[r1][r2] = best + gain;
                }
            }
            dp = ndp;
        }
        return Math.max(dp[n - 1][n - 1], 0);
    }
}
