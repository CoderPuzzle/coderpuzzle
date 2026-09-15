import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int minimumEffortPath(int[][] heights) {
        int rows = heights.length;
        int cols = heights[0].length;
        // hi = the largest adjacent height difference: no path can force a
        // bigger step. A 1x1 grid has no edges, so hi stays 0 and the loop
        // below never runs.
        int hi = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (r + 1 < rows) {
                    hi = Math.max(hi, Math.abs(heights[r + 1][c] - heights[r][c]));
                }
                if (c + 1 < cols) {
                    hi = Math.max(hi, Math.abs(heights[r][c + 1] - heights[r][c]));
                }
            }
        }
        int lo = 0;
        // Feasibility is monotone in the cap: a path that fits under a cap
        // still fits under any larger one, so binary search applies.
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (reachable(heights, rows, cols, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean reachable(int[][] heights, int rows, int cols, int cap) {
        boolean[][] visited = new boolean[rows][cols];
        visited[0][0] = true;
        Deque<int[]> queue = new ArrayDeque<>();
        queue.offer(new int[] { 0, 0 });
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int r = cell[0],
                c = cell[1];
            if (r == rows - 1 && c == cols - 1) {
                return true;
            }
            for (int[] d : dirs) {
                int nr = r + d[0],
                    nc = c + d[1];
                if (
                    nr >= 0 &&
                    nr < rows &&
                    nc >= 0 &&
                    nc < cols &&
                    !visited[nr][nc] &&
                    // Only steps within the current cap may be crossed.
                    Math.abs(heights[nr][nc] - heights[r][c]) <= cap
                ) {
                    visited[nr][nc] = true;
                    queue.offer(new int[] { nr, nc });
                }
            }
        }
        return false;
    }
}
