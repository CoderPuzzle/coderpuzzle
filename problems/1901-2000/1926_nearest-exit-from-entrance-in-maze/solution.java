import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public int nearestExit(String[][] maze, int[] entrance) {
        int m = maze.length,
            n = maze[0].length;
        int er = entrance[0],
            ec = entrance[1];
        // Every move costs one step, so plain BFS from the entrance visits
        // cells in order of increasing distance; dist doubles as the visited
        // set via its -1 sentinel.
        int[][] dist = new int[m][n];
        for (int[] row : dist) java.util.Arrays.fill(row, -1);
        dist[er][ec] = 0;
        Queue<int[]> q = new ArrayDeque<>();
        q.offer(new int[] { er, ec });
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int i = cur[0],
                j = cur[1];
            // Test on pop, not push: this cleanly skips the entrance itself
            // while returning the correct distance for any other border cell.
            if ((i == 0 || i == m - 1 || j == 0 || j == n - 1) && !(i == er && j == ec)) {
                return dist[i][j];
            }
            for (int[] d : dirs) {
                int ni = i + d[0],
                    nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && maze[ni][nj].equals(".") && dist[ni][nj] == -1) {
                    // Assigning distance at enqueue time is what keeps the
                    // queue ordered by distance.
                    dist[ni][nj] = dist[i][j] + 1;
                    q.offer(new int[] { ni, nj });
                }
            }
        }
        // Queue drained without dequeuing any exit: no reachable exit exists.
        return -1;
    }
}
