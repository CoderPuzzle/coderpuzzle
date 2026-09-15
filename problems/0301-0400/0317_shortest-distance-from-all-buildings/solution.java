import java.util.ArrayDeque;
import java.util.Arrays;

class Solution {

    public int shortestDistance(int[][] grid) {
        int m = grid.length,
            n = grid[0].length;
        // One BFS per building, not per empty cell: each search floods the
        // empty region once, and every empty cell accumulates its distance
        // from that building plus a count of buildings that reached it.
        int[] rowStep = { -1, 1, 0, 0 };
        int[] colStep = { 0, 0, -1, 1 };
        int[][] distSum = new int[m][n];
        int[][] reach = new int[m][n];
        int buildings = 0;
        for (int br = 0; br < m; ++br) {
            for (int bc = 0; bc < n; ++bc) {
                if (grid[br][bc] != 1) {
                    continue;
                }
                buildings++;
                // BFS starts at the building itself; buildings and obstacles
                // are impassable, so the search only ever walks into empty
                // land and stops where another building blocks the way.
                int[][] step = new int[m][n];
                for (int[] row : step) {
                    Arrays.fill(row, -1);
                }
                step[br][bc] = 0;
                ArrayDeque<int[]> queue = new ArrayDeque<>();
                queue.add(new int[] { br, bc });
                while (!queue.isEmpty()) {
                    int[] cell = queue.poll();
                    int r = cell[0],
                        c = cell[1];
                    for (int k = 0; k < 4; ++k) {
                        int nr = r + rowStep[k],
                            nc = c + colStep[k];
                        if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] != 0 || step[nr][nc] >= 0) {
                            continue;
                        }
                        step[nr][nc] = step[r][c] + 1;
                        distSum[nr][nc] += step[nr][nc];
                        reach[nr][nc]++;
                        queue.add(new int[] { nr, nc });
                    }
                }
            }
        }
        // A house site must reach EVERY building — a cell sealed off from one
        // building is invalid no matter how short its other distances are.
        int best = -1;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 0 && reach[r][c] == buildings && (best < 0 || distSum[r][c] < best)) {
                    best = distSum[r][c];
                }
            }
        }
        return best;
    }
}
