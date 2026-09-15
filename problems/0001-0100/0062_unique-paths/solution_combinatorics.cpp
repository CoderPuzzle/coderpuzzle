class Solution {
  public:
    int uniquePaths(int m, int n) {
        // Every path is m-1 downs and n-1 rights in some order, so counting
        // paths is counting arrangements: C(m+n-2, m-1).
        long long big = m + n - 2;
        long long small = min(m - 1, n - 1);
        // Multiplicative formula: after step j the running value is exactly
        // C(big-small+j, j), so every division is exact. long longs absorb
        // the intermediate product even where the answer fits an int.
        long long result = 1;
        for (long long j = 1; j <= small; j++) {
            result = result * (big - small + j) / j;
        }
        return (int)result;
    }
};
