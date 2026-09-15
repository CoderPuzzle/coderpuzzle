class Solution {

    public int numMagicSquaresInside(int[][] grid) {
        // Every 3 x 3 window is judged independently, so the scan visits
        // each window's top-left corner and tests it; a grid shorter than
        // three rows or columns leaves the sweep empty.
        int rows = grid.length;
        int cols = grid[0].length;
        int count = 0;
        for (int r = 0; r + 2 < rows; ++r) {
            for (int c = 0; c + 2 < cols; ++c) {
                if (isMagic(grid, r, c)) {
                    ++count;
                }
            }
        }
        return count;
    }

    // Nine distinct values 1..9 total 45, so the four lines through the
    // center add to 4*15 = 45 + 3*center — the center must be 5. One
    // comparison clears most windows; survivors need every row, column,
    // and diagonal at 15, plus a seen-set for distinctness and range: the
    // sums alone also bless duplicate and out-of-range arrangements.
    private boolean isMagic(int[][] grid, int r, int c) {
        if (grid[r + 1][c + 1] != 5) {
            return false;
        }
        for (int i = 0; i < 3; ++i) {
            if (grid[r + i][c] + grid[r + i][c + 1] + grid[r + i][c + 2] != 15) {
                return false;
            }
            if (grid[r][c + i] + grid[r + 1][c + i] + grid[r + 2][c + i] != 15) {
                return false;
            }
        }
        if (grid[r][c] + grid[r + 1][c + 1] + grid[r + 2][c + 2] != 15) {
            return false;
        }
        if (grid[r][c + 2] + grid[r + 1][c + 1] + grid[r + 2][c] != 15) {
            return false;
        }
        boolean[] seen = new boolean[10];
        for (int i = 0; i < 3; ++i) {
            for (int j = 0; j < 3; ++j) {
                int v = grid[r + i][c + j];
                if (v < 1 || v > 9 || seen[v]) {
                    return false;
                }
                seen[v] = true;
            }
        }
        return true;
    }
}
