import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int orangesRotting(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int[][] g = new int[rows][cols];
        for (int r = 0; r < rows; r++) {
            System.arraycopy(grid[r], 0, g[r], 0, cols);
        }
        Deque<int[]> queue = new ArrayDeque<>();
        int fresh = 0;
        // Multi-source BFS: every rotten orange starts at t = 0; the answer
        // is the time the last fresh orange rots. Count fresh cells so
        // walled-off stragglers can be detected at the end.
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (g[r][c] == 2) {
                    queue.offer(new int[] { r, c, 0 });
                } else if (g[r][c] == 1) {
                    fresh++;
                }
            }
        }
        int minutes = 0;
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int r = cur[0],
                c = cur[1],
                t = cur[2];
            // Tracking the max infection time spares per-minute batching.
            if (t > minutes) {
                minutes = t;
            }
            for (int[] d : dirs) {
                int nr = r + d[0];
                int nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] == 1) {
                    // Flip to rotten on enqueue: each cell queues at most
                    // once and `fresh` stays in sync with the grid.
                    g[nr][nc] = 2;
                    fresh--;
                    queue.offer(new int[] { nr, nc, t + 1 });
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
}
