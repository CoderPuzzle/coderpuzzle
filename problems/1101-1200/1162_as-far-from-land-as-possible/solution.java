import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public int maxDistance(int[][] grid) {
        int n = grid.length;
        // copy so the input is not mutated; the copy doubles as visited marks
        int[][] g = new int[n][n];
        for (int i = 0; i < n; i++) {
            g[i] = grid[i].clone();
        }
        Queue<int[]> queue = new ArrayDeque<>();
        // multi-source BFS: every land cell starts at distance 0, so the
        // first wavefront arrival is exactly each cell's nearest-land distance
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (g[i][j] == 1) {
                    queue.add(new int[] { i, j });
                }
            }
        }
        // all water (empty seed) or all land: no distance exists
        if (queue.isEmpty() || queue.size() == n * n) {
            return -1;
        }
        int dist = 0;
        // 4-directional steps match Manhattan distance on this grid
        int[] di = { 1, -1, 0, 0 };
        int[] dj = { 0, 0, 1, -1 };
        while (!queue.isEmpty()) {
            // expand one full level per round; dist counts levels processed
            dist++;
            for (int sz = queue.size(); sz > 0; sz--) {
                int[] cell = queue.poll();
                for (int d = 0; d < 4; d++) {
                    int ni = cell[0] + di[d];
                    int nj = cell[1] + dj[d];
                    if (ni >= 0 && ni < n && nj >= 0 && nj < n && g[ni][nj] == 0) {
                        // flip to 1 on enqueue: each cell is queued once
                        g[ni][nj] = 1;
                        queue.add(new int[] { ni, nj });
                    }
                }
            }
        }
        // the last round absorbed nothing new, so the deepest level is dist-1
        return dist - 1;
    }
}
