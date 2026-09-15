class Solution {

    public int minFlips(int[][] grid) {
        // Each mirrored pair that disagrees costs exactly one flip; agreeing
        // pairs and any middle cell never do.
        int m = grid.length,
            n = grid[0].length;
        int rows = 0,
            cols = 0;
        for (int[] row : grid) {
            for (int lo = 0, hi = n - 1; lo < hi; ++lo, --hi) {
                if (row[lo] != row[hi]) ++rows;
            }
        }
        for (int j = 0; j < n; ++j) {
            for (int lo = 0, hi = m - 1; lo < hi; ++lo, --hi) {
                if (grid[lo][j] != grid[hi][j]) ++cols;
            }
        }
        return Math.min(rows, cols);
    }
}
