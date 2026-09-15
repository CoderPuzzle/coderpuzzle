class Solution {

    public long maximumScore(int[][] grid) {
        int n = grid.length;
        // pre[j][r] = sum of grid[0..r-1][j]; every scored stretch of a
        // column is the difference of two such monotone prefixes.
        long[][] pre = new long[n][n + 1];
        for (int j = 0; j < n; ++j) {
            for (int r = 0; r < n; ++r) pre[j][r + 1] = pre[j][r] + grid[r][j];
        }

        final long NEG = -(1L << 60);
        // A play is fully described by one height h[j] in [0, n] per column
        // (cells 0..h[j]-1 end up black). Cell (r, j) scores iff it is white
        // (r >= h[j]) and some horizontal neighbor is black (r < taller
        // neighbor height), so column j is worth the segment of column sums
        // [h[j], max(h[j-1], h[j+1])). Walk columns left to right carrying
        // the last two heights; choosing the next height settles the middle
        // column's flanks, crediting it exactly once. dp[c][a]: best score
        // after assigning columns 0..t-1 with h[t-1] = c, h[t-2] = a.
        long[][] dp = new long[n + 1][n + 1];
        for (long[] row : dp) java.util.Arrays.fill(row, NEG);
        for (int c = 0; c <= n; ++c) dp[c][0] = 0;

        for (int t = 1; t < n; ++t) {
            long[] pcol = pre[t - 1];
            long[][] ndp = new long[n + 1][n + 1];
            for (long[] row : ndp) java.util.Arrays.fill(row, NEG);
            for (int a = 0; a <= n; ++a) {
                long[] row = dp[a];
                // Credit for choosing h[t] = c is
                //   row[b] + pcol[max(a, b, c)] - pcol[a]
                // over previous heights b. Splitting b against K = max(a, c)
                // makes this an O(1) pair of lookup maxima: b <= K adds the
                // constant pcol[K] to a prefix maximum, while b > K keeps its
                // own pcol[b] in a suffix maximum.
                long[] pm = new long[n + 1];
                long[] sp = new long[n + 2];
                java.util.Arrays.fill(sp, NEG);
                long m = NEG;
                for (int b = 0; b <= n; ++b) {
                    m = Math.max(m, row[b]);
                    pm[b] = m;
                }
                for (int b = n; b >= 0; --b) sp[b] = Math.max(sp[b + 1], row[b] + pcol[b]);
                for (int c = 0; c <= n; ++c) {
                    int k = Math.max(a, c);
                    long best = Math.max(pm[k] + pcol[k], sp[k + 1]);
                    ndp[c][a] = Math.max(ndp[c][a], best - pcol[a]);
                }
            }
            dp = ndp;
        }

        // Final virtual choice: the last column has no right neighbor, so it
        // is credited against max(h[n-2], 0).
        long[] plast = pre[n - 1];
        long ans = -1;
        for (int a = 0; a <= n; ++a) {
            long[] row = dp[a];
            long[] pm = new long[n + 1];
            long[] sp = new long[n + 2];
            java.util.Arrays.fill(sp, NEG);
            long m = NEG;
            for (int b = 0; b <= n; ++b) {
                m = Math.max(m, row[b]);
                pm[b] = m;
            }
            for (int b = n; b >= 0; --b) sp[b] = Math.max(sp[b + 1], row[b] + plast[b]);
            long best = Math.max(pm[a] + plast[a], sp[a + 1]);
            ans = Math.max(ans, best - plast[a]);
        }
        return ans;
    }
}
