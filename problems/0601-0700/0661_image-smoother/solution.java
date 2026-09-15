class Solution {

    public int[][] imageSmoother(int[][] img) {
        // Each output cell averages the 3x3 window around it, clamped to the
        // matrix, so border cells average fewer than nine values; writing
        // into a fresh matrix keeps every window reading unsmoothed input.
        int m = img.length,
            n = img[0].length;
        int[][] smoothed = new int[m][n];
        // The window rows run from max(i-1, 0) to min(i+2, m) and the columns
        // likewise; summing in integers and floor-dividing by the count is
        // the rounding-down average (values are non-negative, so / floors).
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                int total = 0,
                    count = 0;
                for (int r = Math.max(i - 1, 0); r < Math.min(i + 2, m); ++r) {
                    for (int c = Math.max(j - 1, 0); c < Math.min(j + 2, n); ++c) {
                        total += img[r][c];
                        ++count;
                    }
                }
                smoothed[i][j] = total / count;
            }
        }
        return smoothed;
    }
}
