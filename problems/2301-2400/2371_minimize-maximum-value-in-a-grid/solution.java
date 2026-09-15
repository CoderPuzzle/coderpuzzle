import java.util.Arrays;

class Solution {

    public int[][] minScore(int[][] grid) {
        int m = grid.length,
            n = grid[0].length;
        int[][] cells = new int[m * n][];
        int idx = 0;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                cells[idx++] = new int[] { grid[r][c], r, c };
            }
        }
        Arrays.sort(cells, (a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[2], b[2]);
        });
        // Assign in ascending original order: when a cell's turn comes, every
        // smaller cell sharing its row/column is already placed, so only the
        // running maxima of that row and column constrain it.
        int[] rowMax = new int[m];
        int[] colMax = new int[n];
        int[][] res = new int[m][n];
        for (int[] cell : cells) {
            int r = cell[1],
                c = cell[2];
            // Smallest legal replacement: 1 + max of what's already in the
            // row/column; larger demands come only from unplaced cells, which
            // receive strictly larger values later by construction.
            int v = 1 + Math.max(rowMax[r], colMax[c]);
            res[r][c] = v;
            rowMax[r] = v;
            colMax[c] = v;
        }
        return res;
    }
}
