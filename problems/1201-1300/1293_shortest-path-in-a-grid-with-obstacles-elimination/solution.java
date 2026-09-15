import java.util.ArrayDeque;

class Solution {

    public int shortestPath(int[][] grid, int k) {
        int m = grid.length,
            n = grid[0].length;
        if (k >= m + n - 2) {
            return m + n - 2;
        }
        boolean[][][] seen = new boolean[m][n][k + 1];
        ArrayDeque<int[]> queue = new ArrayDeque<>();
        seen[0][0][k] = true;
        queue.add(new int[] { 0, 0, k });
        int steps = 0;
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!queue.isEmpty()) {
            for (int sz = queue.size(); sz > 0; sz--) {
                int[] cur = queue.poll();
                int x = cur[0],
                    y = cur[1],
                    rem = cur[2];
                if (x == m - 1 && y == n - 1) {
                    return steps;
                }
                for (int[] d : dirs) {
                    int nx = x + d[0],
                        ny = y + d[1];
                    if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
                        int nr = rem - grid[nx][ny];
                        if (nr >= 0 && !seen[nx][ny][nr]) {
                            seen[nx][ny][nr] = true;
                            queue.add(new int[] { nx, ny, nr });
                        }
                    }
                }
            }
            steps++;
        }
        return -1;
    }
}
