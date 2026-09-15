import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int latestDayToCross(int row, int col, int[][] cells) {
        // Land only floods, never dries, so crossable days form a prefix of
        // days: binary-search its right endpoint. Day 1 is always crossable.
        int lo = 1,
            hi = row * col;
        while (lo < hi) {
            int mid = (lo + hi + 1) >>> 1; // upper mid: converge on last feasible
            if (canCross(row, col, cells, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private boolean canCross(int row, int col, int[][] cells, int floodedCount) {
        // Rebuild the grid for this query day: mark the flooded cells as
        // water, then test a top-to-bottom walk by BFS.
        int[][] grid = new int[row][col];
        for (int i = 0; i < floodedCount; i++) {
            grid[cells[i][0] - 1][cells[i][1] - 1] = 1;
        }
        Deque<int[]> queue = new ArrayDeque<>();
        boolean[][] seen = new boolean[row][col];
        // Multi-source BFS: every unflooded top-row cell is a start.
        for (int c = 0; c < col; c++) {
            if (grid[0][c] == 0) {
                queue.offer(new int[] { 0, c });
                seen[0][c] = true;
            }
        }
        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int r = cur[0],
                c = cur[1];
            if (r == row - 1) return true; // bottom reached: crossing possible
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d];
                int nc = c + dc[d];
                if (nr >= 0 && nr < row && nc >= 0 && nc < col && !seen[nr][nc] && grid[nr][nc] == 0) {
                    seen[nr][nc] = true;
                    queue.offer(new int[] { nr, nc });
                }
            }
        }
        return false;
    }
}
