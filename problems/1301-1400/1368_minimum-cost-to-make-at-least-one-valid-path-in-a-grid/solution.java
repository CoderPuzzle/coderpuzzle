import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int minCost(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[][] dirs = { { 0, 1 }, { 0, -1 }, { 1, 0 }, { -1, 0 } };
        int[][] dist = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dist[i][j] = Integer.MAX_VALUE;
            }
        }
        dist[0][0] = 0;
        // Shortest path over cells: each move costs 0 when the cell's sign
        // points at that neighbor and 1 otherwise (the price of rewriting it).
        // All weights are 0/1, so Dijkstra collapses into 0-1 BFS.
        Deque<int[]> dq = new ArrayDeque<>();
        dq.addFirst(new int[] { 0, 0 });
        while (!dq.isEmpty()) {
            // The front of the deque always carries the smallest distance.
            int[] cur = dq.pollFirst();
            int i = cur[0];
            int j = cur[1];
            int d = dist[i][j];
            for (int s = 1; s <= 4; s++) {
                int ni = i + dirs[s - 1][0];
                int nj = j + dirs[s - 1][1];
                // Bounds check drops signs pointing off the grid.
                if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
                    int cost = grid[i][j] == s ? 0 : 1;
                    if (d + cost < dist[ni][nj]) {
                        dist[ni][nj] = d + cost;
                        // 0-weight improvements go to the front, 1-weight to
                        // the back, keeping the deque ordered by distance; the
                        // dist table blocks any worse re-expansion.
                        if (cost == 0) {
                            dq.addFirst(new int[] { ni, nj });
                        } else {
                            dq.addLast(new int[] { ni, nj });
                        }
                    }
                }
            }
        }
        return dist[m - 1][n - 1];
    }
}
