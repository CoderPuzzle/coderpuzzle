class Solution {

    public int maximumRows(int[][] matrix, int numSelect) {
        // Encode rows as bitmasks; a set of selected columns covers a
        // row exactly when the row's mask is a subset of it. Enumerate
        // every mask with popcount == numSelect and keep the best.
        int m = matrix.length;
        int n = matrix[0].length;
        int[] masks = new int[m];
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (matrix[i][j] == 1) {
                    masks[i] |= 1 << j;
                }
            }
        }
        int best = 0;
        for (int sel = 0; sel < 1 << n; ++sel) {
            if (Integer.bitCount(sel) != numSelect) {
                continue;
            }
            int covered = 0;
            for (int row : masks) {
                if ((row & ~sel) == 0) {
                    ++covered;
                }
            }
            best = Math.max(best, covered);
        }
        return best;
    }
}
