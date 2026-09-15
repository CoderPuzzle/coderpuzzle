import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public int getFood(String[][] grid) {
        int m = grid.length,
            n = grid[0].length;
        int sr = -1,
            sc = -1;
        for (int i = 0; i < m && sr == -1; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j].equals("*")) {
                    sr = i;
                    sc = j;
                    break;
                }
            }
        }
        int[][] dist = new int[m][n];
        for (int[] row : dist) java.util.Arrays.fill(row, -1);
        dist[sr][sc] = 0;
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[] { sr, sc });
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int i = cur[0],
                j = cur[1];
            if (grid[i][j].equals("#")) return dist[i][j];
            for (int[] d : dirs) {
                int ni = i + d[0],
                    nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && !grid[ni][nj].equals("X") && dist[ni][nj] == -1) {
                    dist[ni][nj] = dist[i][j] + 1;
                    q.offer(new int[] { ni, nj });
                }
            }
        }
        return -1;
    }
}
