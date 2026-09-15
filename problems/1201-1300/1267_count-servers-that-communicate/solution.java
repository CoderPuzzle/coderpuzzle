class Solution {

    public int countServers(int[][] grid) {
        // A server communicates iff its row or its column holds another
        // server — any communicating partner must share one of those lines,
        // so tallies per line settle it without searching the pair graph.
        int m = grid.length,
            n = grid[0].length;
        int[] row = new int[m];
        int[] col = new int[n];
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 1) {
                    row[r] += 1;
                    col[c] += 1;
                }
            }
        }
        int total = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 1 && (row[r] > 1 || col[c] > 1)) {
                    total += 1;
                }
            }
        }
        return total;
    }
}
