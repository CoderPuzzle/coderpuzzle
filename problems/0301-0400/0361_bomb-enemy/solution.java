class Solution {

    public int maxKilledEnemies(String[][] grid) {
        // A bomb planted on an empty cell kills along its row and column
        // until a wall, so its reach is the two wall-free segments crossing
        // the cell. Every empty cell in a segment shares that segment's
        // enemies: count each segment once and reuse the count.
        int m = grid.length;
        int n = grid[0].length;
        int[] colHits = new int[n];
        int best = 0;
        for (int i = 0; i < m; i++) {
            int rowHits = 0;
            for (int j = 0; j < n; j++) {
                // First cell of a row segment (after a wall or at the left
                // edge): one scan counts the enemies up to the next wall.
                if (j == 0 || grid[i][j - 1].equals("W")) {
                    rowHits = countRow(grid, i, j);
                }
                // Same lazily per column: recount only when the cell above
                // is a wall or the top edge.
                if (i == 0 || grid[i - 1][j].equals("W")) {
                    colHits[j] = countCol(grid, i, j);
                }
                if (grid[i][j].equals("0")) {
                    best = Math.max(best, rowHits + colHits[j]);
                }
            }
        }
        return best;
    }

    // Enemies in row i from column j up to the next wall.
    private int countRow(String[][] grid, int i, int j) {
        int hits = 0;
        for (int k = j; k < grid[i].length && !grid[i][k].equals("W"); k++) {
            if (grid[i][k].equals("E")) hits++;
        }
        return hits;
    }

    // Enemies in column j from row i down to the next wall.
    private int countCol(String[][] grid, int i, int j) {
        int hits = 0;
        for (int k = i; k < grid.length && !grid[k][j].equals("W"); k++) {
            if (grid[k][j].equals("E")) hits++;
        }
        return hits;
    }
}
