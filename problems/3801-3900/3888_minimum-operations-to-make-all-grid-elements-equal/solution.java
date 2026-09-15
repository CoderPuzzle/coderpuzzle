class Solution {

    public long minOperations(int[][] grid, int k) {
        int m = grid.length;
        int n = grid[0].length;
        // Every operation count is an affine function A * T + B of the target
        // T, with A always 0 or 1. Two 2D prefix sums answer the "coverage
        // from already-placed blocks" query for each cell in O(1).
        long[][] pa = new long[m + 1][n + 1];
        long[][] pb = new long[m + 1][n + 1];
        Long fixedT = null; // T fixed by a boundary cell
        boolean hasLow = false;
        long lowT = 0; // lower bound on T from X >= 0 (A == 1 cells)
        long sumA = 0;
        long sumB = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int r1 = Math.max(0, i - k + 1);
                int c1 = Math.max(0, j - k + 1);
                long covA = rect(pa, r1, i - 1, c1, j) + rect(pa, i, i, c1, j - 1);
                long covB = rect(pb, r1, i - 1, c1, j) + rect(pb, i, i, c1, j - 1);
                long a;
                long b;
                if (i <= m - k && j <= n - k) {
                    a = 1 - covA;
                    b = -((long) grid[i][j]) - covB;
                    if (a == 1) {
                        if (!hasLow || -b > lowT) {
                            lowT = -b;
                            hasLow = true;
                        }
                    } else if (a == 0) {
                        if (b < 0) {
                            return -1;
                        }
                    } else {
                        return -1;
                    }
                    sumA += a;
                    sumB += b;
                } else {
                    // Boundary cell: grid[i][j] + cov must equal T.
                    if (covA == 1) {
                        if ((long) grid[i][j] + covB != 0) {
                            return -1;
                        }
                    } else if (covA == 0) {
                        long t = (long) grid[i][j] + covB;
                        if (fixedT == null) {
                            fixedT = t;
                        } else if (fixedT != t) {
                            return -1;
                        }
                    } else {
                        return -1;
                    }
                    a = 0;
                    b = 0;
                }
                pa[i + 1][j + 1] = pa[i][j + 1] + pa[i + 1][j] - pa[i][j] + a;
                pb[i + 1][j + 1] = pb[i][j + 1] + pb[i + 1][j] - pb[i][j] + b;
            }
        }
        if (fixedT != null) {
            if (hasLow && fixedT < lowT) {
                return -1;
            }
            return sumA * fixedT + sumB;
        }
        long t = hasLow ? lowT : 0;
        return sumA * t + sumB;
    }

    private long rect(long[][] p, int r1, int r2, int c1, int c2) {
        if (r1 > r2 || c1 > c2) {
            return 0;
        }
        return p[r2 + 1][c2 + 1] - p[r1][c2 + 1] - p[r2 + 1][c1] + p[r1][c1];
    }
}
