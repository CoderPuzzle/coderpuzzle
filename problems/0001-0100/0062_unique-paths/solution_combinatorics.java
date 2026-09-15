class Solution {

    public int uniquePaths(int m, int n) {
        // Every path is m-1 downs and n-1 rights in some order, so counting
        // paths is counting arrangements: C(m+n-2, m-1).
        long big = m + n - 2;
        long small = Math.min(m - 1, n - 1);
        // Multiplicative formula: after step j the running value is exactly
        // C(big-small+j, j), so every division is exact. longs absorb the
        // intermediate product even where the final answer fits an int.
        long result = 1;
        for (long j = 1; j <= small; j++) {
            result = (result * (big - small + j)) / j;
        }
        return (int) result;
    }
}
