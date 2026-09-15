class Solution {

    public int countIslands(int[][] grid, int k) {
        int m = grid.length,
            n = grid[0].length;
        boolean[][] seen = new boolean[m][n];
        // Iterative BFS: an island can span all 1e5 cells, so no recursion.
        // One shared queue buffer; each island's flood fill starts over.
        int[] queue = new int[m * n];
        int[][] dirs = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        int count = 0;
        for (int si = 0; si < m; ++si) {
            for (int sj = 0; sj < n; ++sj) {
                if (grid[si][sj] == 0 || seen[si][sj]) continue;
                // An island total reaches 1e5 cells * 1e6 = 1e11, past the
                // int range, so the sum accumulates in a long.
                long total = 0;
                int head = 0,
                    tail = 0;
                queue[tail++] = si * n + sj;
                seen[si][sj] = true;
                while (head < tail) {
                    int cell = queue[head++];
                    int x = cell / n,
                        y = cell % n;
                    total += grid[x][y];
                    for (int[] d : dirs) {
                        int nx = x + d[0],
                            ny = y + d[1];
                        if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
                        if (grid[nx][ny] == 0 || seen[nx][ny]) continue;
                        seen[nx][ny] = true;
                        queue[tail++] = nx * n + ny;
                    }
                }
                if (total % k == 0) ++count;
            }
        }
        return count;
    }
}
