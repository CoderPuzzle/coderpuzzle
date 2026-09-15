import java.util.PriorityQueue;

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
        // Plain Dijkstra: a binary heap yields the smallest tentative distance
        // on every pop, whatever the weights are.
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.offer(new int[] { 0, 0, 0 });
        while (!heap.isEmpty()) {
            int[] cur = heap.poll();
            int d = cur[0],
                i = cur[1],
                j = cur[2];
            // The first pop of a cell settles its distance for good.
            if (i == m - 1 && j == n - 1) {
                return d;
            }
            // Stale-entry guard: skip outdated heap records.
            if (d > dist[i][j]) {
                continue;
            }
            for (int s = 1; s <= 4; s++) {
                int ni = i + dirs[s - 1][0];
                int nj = j + dirs[s - 1][1];
                // Bounds check drops signs pointing off the grid.
                if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
                    int cost = grid[i][j] == s ? 0 : 1;
                    // Relax only when the rewrite price strictly improves.
                    if (d + cost < dist[ni][nj]) {
                        dist[ni][nj] = d + cost;
                        heap.offer(new int[] { d + cost, ni, nj });
                    }
                }
            }
        }
        return dist[m - 1][n - 1];
    }
}
