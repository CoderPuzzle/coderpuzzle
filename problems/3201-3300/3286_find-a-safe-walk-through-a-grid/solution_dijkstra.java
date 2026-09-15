import java.util.PriorityQueue;

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
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.offer(new int[] { grid[0][0], 0, 0 });
        while (!heap.isEmpty()) {
            int[] cur = heap.poll();
            int d = cur[0],
                r = cur[1],
                c = cur[2];
            // The first time the goal is popped its cost is optimal.
            if (r == m - 1 && c == n - 1) {
                return d <= budget;
            }
            // Stale-entry guard: skip outdated heap records.
            if (d > dist[r][c]) {
                continue;
            }
            int[][] steps = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
            for (int[] step : steps) {
                int nr = r + step[0],
                    nc = c + step[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                    continue;
                }
                int nd = d + grid[nr][nc];
                // Relax only when the unsafe count strictly improves.
                if (nd < dist[nr][nc]) {
                    dist[nr][nc] = nd;
                    heap.offer(new int[] { nd, nr, nc });
                }
            }
        }
        return false;
    }
}
