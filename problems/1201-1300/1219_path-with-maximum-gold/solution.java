class Solution {

    public int getMaximumGold(int[][] grid) {
        rows = grid.length;
        cols = grid[0].length;
        this.grid = grid;
        int best = 0;
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (grid[r][c] > 0) best = Math.max(best, walk(r, c));
            }
        }
        return best;
    }

    private int rows;
    private int cols;
    private int[][] grid;

    private int walk(int r, int c) {
        // Zeroing on entry doubles as the visited mark; restore on exit.
        int gold = grid[r][c];
        grid[r][c] = 0;
        int deepest = 0;
        int[][] steps = { { r - 1, c }, { r + 1, c }, { r, c - 1 }, { r, c + 1 } };
        for (int[] step : steps) {
            int nr = step[0],
                nc = step[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] > 0) {
                deepest = Math.max(deepest, walk(nr, nc));
            }
        }
        grid[r][c] = gold;
        return gold + deepest;
    }
}
