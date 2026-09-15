import java.util.*;

class Solution {

    public int networkDelayTime(int[][] times, int n, int k) {
        final int INF = 100_000_000;
        int[][] d = new int[n + 1][n + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                d[i][j] = i == j ? 0 : INF;
            }
        }
        for (int[] t : times) {
            if (t[2] < d[t[0]][t[1]]) d[t[0]][t[1]] = t[2];
        }
        // Relax every path through each midpoint m: one shot gives all pairs.
        for (int m = 1; m <= n; m++) {
            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= n; j++) {
                    // The finite guards keep INF + INF from overflowing.
                    if (d[i][m] < INF && d[m][j] < INF && d[i][m] + d[m][j] < d[i][j]) {
                        d[i][j] = d[i][m] + d[m][j];
                    }
                }
            }
        }
        int best = 0;
        for (int j = 1; j <= n; j++) {
            // Anything still INF in row k is unreachable from the source.
            if (d[k][j] >= INF) return -1;
            best = Math.max(best, d[k][j]);
        }
        return best;
    }
}
