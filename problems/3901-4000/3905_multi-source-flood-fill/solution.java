import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[][] colorGrid(int n, int m, int[][] sources) {
        int[][] grid = new int[n][m];
        int[][] dist = new int[n][m];
        for (int i = 0; i < n; i++) {
            java.util.Arrays.fill(dist[i], -1);
        }
        Deque<int[]> queue = new ArrayDeque<>();
        for (int[] s : sources) {
            grid[s[0]][s[1]] = s[2];
            dist[s[0]][s[1]] = 0;
            queue.add(new int[] { s[0], s[1] });
        }
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int i = cur[0],
                j = cur[1];
            int d = dist[i][j];
            for (int[] dir : dirs) {
                int ni = i + dir[0],
                    nj = j + dir[1];
                if (0 <= ni && ni < n && 0 <= nj && nj < m) {
                    if (dist[ni][nj] == -1) {
                        dist[ni][nj] = d + 1;
                        grid[ni][nj] = grid[i][j];
                        queue.add(new int[] { ni, nj });
                    } else if (dist[ni][nj] == d + 1) {
                        // reached at the same time step by another color
                        if (grid[i][j] > grid[ni][nj]) {
                            grid[ni][nj] = grid[i][j];
                        }
                    }
                }
            }
        }
        return grid;
    }
}
