import java.util.Arrays;

class Solution {

    public int minCost(int[][] grid, int k) {
        int m = grid.length,
            n = grid[0].length;
        long INF = Long.MAX_VALUE / 4;
        // Layer 0 is the plain right/down minimum path sum: every move pays
        // its destination cell, and standing on the start costs nothing.
        long[][] d = new long[m][n];
        for (long[] row : d) Arrays.fill(row, INF);
        d[0][0] = 0;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (i == 0 && j == 0) continue;
                long best = i > 0 ? d[i - 1][j] : INF;
                if (j > 0 && d[i][j - 1] < best) best = d[i][j - 1];
                d[i][j] = best + grid[i][j];
            }
        }
        // Each further layer opens with one teleport: land anywhere whose
        // value is at least mine, at the previous layer's price of that
        // launch cell. Cells sorted by value descending turn the scan into
        // a running prefix minimum; ties share one prefix because the test
        // is >=.
        int[][] cells = new int[m * n][2];
        int idx = 0;
        for (int i = 0; i < m; ++i) for (int j = 0; j < n; ++j) {
            cells[idx][0] = i;
            cells[idx][1] = j;
            ++idx;
        }
        Arrays.sort(cells, (a, b) -> grid[b[0]][b[1]] - grid[a[0]][a[1]]);
        long answer = d[m - 1][n - 1];
        for (int step = 0; step < k; ++step) {
            long[][] seed = new long[m][n];
            for (long[] row : seed) Arrays.fill(row, INF);
            long run = INF;
            int p = 0;
            for (int[] c : cells) {
                while (p < cells.length && grid[cells[p][0]][cells[p][1]] >= grid[c[0]][c[1]]) {
                    long cand = d[cells[p][0]][cells[p][1]];
                    if (cand < run) run = cand;
                    ++p;
                }
                seed[c[0]][c[1]] = run;
            }
            // Then ordinary right/down moves carry each landing spot through
            // the rest of the layer, as in the plain path-sum pass above.
            for (int i = 0; i < m; ++i) {
                for (int j = 0; j < n; ++j) {
                    long best = seed[i][j],
                        g = grid[i][j];
                    if (i > 0 && seed[i - 1][j] + g < best) best = seed[i - 1][j] + g;
                    if (j > 0 && seed[i][j - 1] + g < best) best = seed[i][j - 1] + g;
                    seed[i][j] = best;
                }
            }
            d = seed;
            if (d[m - 1][n - 1] < answer) answer = d[m - 1][n - 1];
        }
        return (int) answer;
    }
}
