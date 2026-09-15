import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean hasValidPath(int[][] grid) {
        // Each street type is the set of sides it opens. A move between
        // neighbouring cells is legal only when the source opens the shared
        // side AND the target opens the opposite side, so a plain BFS from
        // (0,0) over those mutual connections decides reachability.
        int[][] streetSides = { {}, { 0, 1 }, { 2, 3 }, { 0, 3 }, { 1, 3 }, { 0, 2 }, { 1, 2 } };
        int[][] step = { { 0, -1 }, { 0, 1 }, { -1, 0 }, { 1, 0 } };
        int[] opposite = { 1, 0, 3, 2 };
        int m = grid.length;
        int n = grid[0].length;
        boolean[][] visited = new boolean[m][n];
        Deque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] { 0, 0 });
        visited[0][0] = true;
        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int row = cell[0];
            int col = cell[1];
            if (row == m - 1 && col == n - 1) {
                return true;
            }
            for (int side : streetSides[grid[row][col]]) {
                int nr = row + step[side][0];
                int nc = col + step[side][1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc]) {
                    continue;
                }
                for (int targetSide : streetSides[grid[nr][nc]]) {
                    if (targetSide == opposite[side]) {
                        visited[nr][nc] = true;
                        queue.add(new int[] { nr, nc });
                        break;
                    }
                }
            }
        }
        return false;
    }
}
