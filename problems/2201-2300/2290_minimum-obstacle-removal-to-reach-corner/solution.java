import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int minimumObstacles(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        final int INF = Integer.MAX_VALUE;
        int[][] dist = new int[m][n];
        for (int[] row : dist) java.util.Arrays.fill(row, INF);
        dist[0][0] = 0;
        Deque<int[]> dq = new ArrayDeque<>();
        dq.add(new int[] { 0, 0 });
        int[][] dirs = { { 0, 1 }, { 0, -1 }, { 1, 0 }, { -1, 0 } };
        while (!dq.isEmpty()) {
            int[] cur = dq.pollFirst();
            int i = cur[0],
                j = cur[1];
            // A popped cell is already final: the deque's distances are
            // non-decreasing, which is what replaces a priority queue.
            int d = dist[i][j];
            for (int[] dir : dirs) {
                int ni = i + dir[0],
                    nj = j + dir[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
                    // Edge cost = grid[neighbour]: 1 to clear an obstacle,
                    // 0 for a free step, so dist is obstacles removed.
                    int nd = d + grid[ni][nj];
                    // Relax only on strict improvement — prunes stale
                    // entries and bounds how often a cell re-enters.
                    if (nd < dist[ni][nj]) {
                        dist[ni][nj] = nd;
                        // 0-1 BFS: free steps go to the front, obstacle
                        // steps to the back, keeping the deque sorted.
                        if (grid[ni][nj] == 0) dq.addFirst(new int[] { ni, nj });
                        else dq.addLast(new int[] { ni, nj });
                    }
                }
            }
        }
        return dist[m - 1][n - 1];
    }
}
