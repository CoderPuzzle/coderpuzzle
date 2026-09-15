class Solution {

    public long numberOfRoutes(String[] grid, int d) {
        final long MOD = 1_000_000_007L;
        int n = grid.length;
        int m = grid[0].length();
        // up[c]: ways standing on (r, c) after an arrival from below (or the
        // start); same_: ways standing there after a same-row slide. A slide
        // may not follow another slide, so slides feed only from up.
        long[] up = new long[m];
        for (int c = 0; c < m; c++) {
            up[c] = grid[n - 1].charAt(c) == '.' ? 1 : 0;
        }
        // An up move has dr = -1, so 1 + dc^2 <= d^2 bounds |dc| by
        // floor(sqrt(d^2 - 1)) — d = 1 forbids diagonals entirely.
        int wUp = (int) Math.floor(Math.sqrt((double) d * d - 1));

        long[] same = slidesOf(grid, up, n - 1, d, m);
        for (int r = n - 2; r >= 0; r--) {
            // Every way of standing anywhere in row r+1 may step up into
            // row r's window around column c.
            long[] pref = new long[m + 1];
            for (int v = 0; v < m; v++) {
                pref[v + 1] = grid[r + 1].charAt(v) == '.' ? (pref[v] + up[v] + same[v]) % MOD : pref[v];
            }
            long[] newUp = new long[m];
            for (int c = 0; c < m; c++) {
                if (grid[r].charAt(c) != '.') continue;
                int lo = Math.max(0, c - wUp);
                int hi = Math.min(m - 1, c + wUp);
                newUp[c] = (((pref[hi + 1] - pref[lo]) % MOD) + MOD) % MOD;
            }
            same = slidesOf(grid, newUp, r, d, m);
            up = newUp;
        }
        long ans = 0;
        for (int c = 0; c < m; c++) {
            if (grid[0].charAt(c) == '.') {
                ans = (ans + up[c] + same[c]) % MOD;
            }
        }
        return ans;
    }

    // Prefix sums over the row's up-values; the Euclidean bound for a
    // same-row move is |dc| <= d (dr = 0). Slides feed only from up.
    private long[] slidesOf(String[] grid, long[] upValues, int row, int d, int m) {
        final long MOD = 1_000_000_007L;
        long[] pref = new long[m + 1];
        for (int v = 0; v < m; v++) {
            pref[v + 1] = grid[row].charAt(v) == '.' ? (pref[v] + upValues[v]) % MOD : pref[v];
        }
        long[] out = new long[m];
        for (int c = 0; c < m; c++) {
            if (grid[row].charAt(c) != '.') continue;
            int lo = Math.max(0, c - d);
            int hi = Math.min(m - 1, c + d);
            out[c] = (((pref[hi + 1] - pref[lo] - upValues[c]) % MOD) + MOD) % MOD;
        }
        return out;
    }
}
