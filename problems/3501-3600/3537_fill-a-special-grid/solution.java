class Solution {

    public int[][] specialGrid(int n) {
        // Bottom-up quadrant doubling. A special grid of level k is, in
        // reading order of the conditions, TL = 3·4^(k-1) + G(k-1) on the
        // left of the top half, TR = G(k-1) on the right, BL and BR follow
        // in the bottom half — so each step rebuilds every row of G(k-1)
        // into one top-half row and one bottom-half row, the top halves
        // grouped before the bottom halves.
        int[][] grid = { { 0 } };
        int step = 1;
        for (int level = 0; level < n; ++level) {
            int rows = grid.length;
            int half = grid[0].length;
            int[][] next = new int[2 * rows][2 * half];
            for (int index = 0; index < rows; ++index) {
                int[] row = grid[index];
                for (int c = 0; c < half; ++c) {
                    next[index][c] = row[c] + 3 * step;
                    next[index][c + half] = row[c];
                    next[rows + index][c] = row[c] + 2 * step;
                    next[rows + index][c + half] = row[c] + step;
                }
            }
            grid = next;
            step *= 4;
        }
        return grid;
    }
}
