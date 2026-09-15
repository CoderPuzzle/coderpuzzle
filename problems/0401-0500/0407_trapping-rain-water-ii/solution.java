import java.util.PriorityQueue;

class Solution {

    public int trapRainWater(int[][] heightMap) {
        int m = heightMap.length,
            n = heightMap[0].length;
        boolean[][] visited = new boolean[m][n];
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        // Water spills off the map at the border, so the frontier starts as
        // the whole border ring.
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
                    heap.offer(new int[] { heightMap[i][j], i, j });
                    visited[i][j] = true;
                }
            }
        }
        int water = 0;
        int[][] dirs = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
        while (!heap.isEmpty()) {
            int[] cell = heap.poll();
            // h is the frontier minimum: no undiscovered cell can hold water
            // above h, since any escape path crosses the frontier at >= h.
            int h = cell[0];
            for (int[] d : dirs) {
                int ni = cell[1] + d[0],
                    nj = cell[2] + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj]) {
                    visited[ni][nj] = true;
                    int nh = heightMap[ni][nj];
                    if (nh < h) {
                        // Lower neighbor settles now, filled up to level h.
                        water += h - nh;
                    }
                    // Push max(h, nh): entries carry the effective
                    // water-plus-terrain level, the running spill level.
                    heap.offer(new int[] { Math.max(h, nh), ni, nj });
                }
            }
        }
        return water;
    }
}
