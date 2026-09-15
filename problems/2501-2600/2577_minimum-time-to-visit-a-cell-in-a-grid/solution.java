import java.util.Arrays;
import java.util.PriorityQueue;

class Solution {

    public int minimumTime(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        if (m == 1 && n == 1) {
            return 0;
        }
        // If both neighbours of the start cell demand more than 1s we can never
        // leave the start (no adjacent cell to wait on).
        boolean canRight = n > 1 && grid[0][1] <= 1;
        boolean canDown = m > 1 && grid[1][0] <= 1;
        if (!canRight && !canDown) {
            return -1;
        }

        int[][] dist = new int[m][n];
        for (int[] row : dist) {
            Arrays.fill(row, Integer.MAX_VALUE);
        }
        dist[0][0] = 0;
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.add(new int[] { 0, 0, 0 });
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int t = top[0],
                r = top[1],
                c = top[2];
            if (t != dist[r][c]) {
                continue;
            }
            if (r == m - 1 && c == n - 1) {
                return t;
            }
            for (int[] d : dirs) {
                int nr = r + d[0],
                    nc = c + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                    continue;
                }
                int nt = t + 1;
                if (nt < grid[nr][nc]) {
                    if ((grid[nr][nc] - nt) % 2 == 0) {
                        nt = grid[nr][nc];
                    } else {
                        nt = grid[nr][nc] + 1;
                    }
                }
                if (nt < dist[nr][nc]) {
                    dist[nr][nc] = nt;
                    heap.add(new int[] { nt, nr, nc });
                }
            }
        }
        return -1;
    }
}
