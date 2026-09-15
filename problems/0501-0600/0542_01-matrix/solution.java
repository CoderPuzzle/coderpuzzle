import java.util.*;

class Solution {

    public int[][] updateMatrix(int[][] mat) {
        int m = mat.length,
            n = mat[0].length;
        int[][] dist = new int[m][n];
        for (int[] row : dist) Arrays.fill(row, -1);
        ArrayDeque<int[]> queue = new ArrayDeque<>();
        // Reverse the question: every zero broadcasts at distance 0 and the
        // first wavefront to reach a cell arrives on a shortest path.
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    dist[i][j] = 0;
                    queue.add(new int[] { i, j });
                }
            }
        }
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int i = cell[0],
                j = cell[1];
            for (int[] dir : dirs) {
                int ni = i + dir[0],
                    nj = j + dir[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && dist[ni][nj] == -1) {
                    // An unset distance doubles as the visited check, and
                    // assigning before enqueueing keeps each cell queued
                    // exactly once; non-decreasing dequeue order makes the
                    // first assignment final.
                    dist[ni][nj] = dist[i][j] + 1;
                    queue.add(new int[] { ni, nj });
                }
            }
        }
        return dist;
    }
}
