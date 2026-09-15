import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean findSafeWalk(int[][] grid, int health) {
        // A path's cost is the number of unsafe cells it enters, and both
        // endpoints are entered — so grid[0][0] charges immediately. The
        // walk is safe iff some path costs at most health - 1.
        int budget = health - 1;
        int m = grid.length,
            n = grid[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) {
            java.util.Arrays.fill(row, m * n + 1);
        }
        dist[0][0] = grid[0][0];
        Deque<int[]> queue = new ArrayDeque<>();
        queue.addLast(new int[] { 0, 0 });
        while (!queue.isEmpty()) {
            int[] cell = queue.pollFirst();
            int r = cell[0],
                c = cell[1],
                d = dist[r][c];
            if (d > budget) {
                continue;
            }
            if (r == m - 1 && c == n - 1) {
                return true;
            }
            int[][] steps = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
            for (int[] step : steps) {
                int nr = r + step[0],
                    nc = c + step[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                    continue;
                }
                int nd = d + grid[nr][nc];
                if (nd < dist[nr][nc] && nd <= budget) {
                    dist[nr][nc] = nd;
                    // Free move joins the current layer; a paid move goes to
                    // the back so layers stay ordered.
                    if (grid[nr][nc] == 1) {
                        queue.addLast(new int[] { nr, nc });
                    } else {
                        queue.addFirst(new int[] { nr, nc });
                    }
                }
            }
        }
        return false;
    }
}
