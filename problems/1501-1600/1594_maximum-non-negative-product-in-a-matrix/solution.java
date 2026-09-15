class Solution {

    private static final long MOD = 1_000_000_007L;

    public int maxProductPath(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        long[] maxRow = new long[n];
        long[] minRow = new long[n];
        maxRow[0] = minRow[0] = grid[0][0];
        for (int j = 1; j < n; j++) {
            long value = maxRow[j - 1] * grid[0][j];
            maxRow[j] = minRow[j] = value;
        }

        for (int i = 1; i < m; i++) {
            long[] newMax = new long[n];
            long[] newMin = new long[n];
            long value = maxRow[0] * grid[i][0];
            newMax[0] = newMin[0] = value;
            for (int j = 1; j < n; j++) {
                long cur = grid[i][j];
                long a = maxRow[j] * cur;
                long b = minRow[j] * cur;
                long c = newMax[j - 1] * cur;
                long d = newMin[j - 1] * cur;
                newMax[j] = Math.max(Math.max(a, b), Math.max(c, d));
                newMin[j] = Math.min(Math.min(a, b), Math.min(c, d));
            }
            maxRow = newMax;
            minRow = newMin;
        }

        long best = maxRow[n - 1];
        if (best < 0) {
            return -1;
        }
        return (int) (best % MOD);
    }
}
