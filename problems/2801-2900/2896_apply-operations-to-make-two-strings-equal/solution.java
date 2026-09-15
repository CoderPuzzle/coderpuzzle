class Solution {

    public int minOperations(String s1, String s2, int x) {
        int n = s1.length();
        int[] diffs = new int[n];
        int m = 0;
        for (int i = 0; i < n; ++i) {
            if (s1.charAt(i) != s2.charAt(i)) {
                diffs[m++] = i;
            }
        }
        if (m % 2 == 1) {
            return -1;
        }
        long INF = 1L << 40;
        // pending[i][c]: mismatches before i are resolved, mismatch i is not,
        // and c = 1 when an already-paid x-op covers one future mismatch for
        // free. The credit may stay open across other pairs — nesting an
        // x-pair around an adjacent chain is exactly what beats pairing
        // consecutive mismatches when x is small.
        long[][] pending = new long[m + 1][2];
        for (long[] row : pending) {
            row[0] = INF;
            row[1] = INF;
        }
        pending[0][0] = 0;
        for (int i = 0; i < m; ++i) {
            long free = pending[i][0];
            long credited = pending[i][1];
            // Close a credit: mismatch i flips free with the earlier partner.
            pending[i + 1][0] = Math.min(pending[i + 1][0], credited);
            // Open a credit: pay x, mismatch i pairs with a later mismatch.
            pending[i + 1][1] = Math.min(pending[i + 1][1], free + x);
            if (i + 2 <= m) {
                long pair = Math.min((long) x, (long) (diffs[i + 1] - diffs[i]));
                pending[i + 2][0] = Math.min(pending[i + 2][0], free + pair);
                pending[i + 2][1] = Math.min(pending[i + 2][1], credited + pair);
            }
        }
        return (int) pending[m][0];
    }
}
