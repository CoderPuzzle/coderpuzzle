import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public int[][] highestPeak(int[][] isWater) {
        int m = isWater.length,
            n = isWater[0].length;
        // Optimal height = distance to the nearest water: the two rules cap
        // every cell there, and assigning exactly that maximizes all cells
        // at once (neighboring distances differ by at most 1).
        int[][] height = new int[m][n];
        for (int[] row : height) java.util.Arrays.fill(row, -1);
        Queue<int[]> q = new ArrayDeque<>();
        // Multi-source BFS: every water cell starts at height 0; each BFS
        // ring is one step farther from some water cell.
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (isWater[i][j] == 1) {
                    height[i][j] = 0;
                    q.offer(new int[] { i, j });
                }
            }
        }
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int i = cur[0],
                j = cur[1];
            for (int[] d : dirs) {
                int ni = i + d[0],
                    nj = j + d[1];
                // height == -1 doubles as the visited marker, so each cell
                // is enqueued once, by its nearest source.
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && height[ni][nj] == -1) {
                    height[ni][nj] = height[i][j] + 1;
                    q.offer(new int[] { ni, nj });
                }
            }
        }
        return height;
    }
}
