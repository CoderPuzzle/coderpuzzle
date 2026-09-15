import java.util.PriorityQueue;

class Solution {

    public int swimInWater(int[][] grid) {
        int n = grid.length;
        // A path's cost is the max elevation along it, and max is
        // monotone, so Dijkstra's greedy argument holds with max
        // relaxation. dist holds the earliest time each cell is
        // reachable — the start waits for grid[0][0] itself.
        int[][] dist = new int[n][n];
        for (int[] row : dist) {
            java.util.Arrays.fill(row, Integer.MAX_VALUE);
        }
        dist[0][0] = grid[0][0];
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.add(new int[] { grid[0][0], 0, 0 });
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int t = top[0],
                r = top[1],
                c = top[2];
            // First pop of the target is optimal: cells settle in order
            // of their true earliest time.
            if (r == n - 1 && c == n - 1) {
                return t;
            }
            // Skip stale entries superseded by a better settled time.
            if (t > dist[r][c]) {
                continue;
            }
            for (int[] d : dirs) {
                int nr = r + d[0],
                    nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                    // Extending a path can only keep or raise its time.
                    int nt = Math.max(t, grid[nr][nc]);
                    if (nt < dist[nr][nc]) {
                        dist[nr][nc] = nt;
                        heap.add(new int[] { nt, nr, nc });
                    }
                }
            }
        }
        return dist[n - 1][n - 1];
    }
}
