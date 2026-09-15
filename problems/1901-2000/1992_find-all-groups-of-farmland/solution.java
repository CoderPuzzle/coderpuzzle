import java.util.*;

class Solution {

    public int[][] findFarmland(int[][] land) {
        // Iterative BFS per unvisited farmland cell: flood the component and
        // track the min/max row and column, which for a rectangular group is
        // exactly its top-left and bottom-right corner.
        int m = land.length,
            n = land[0].length;
        boolean[][] seen = new boolean[m][n];
        List<int[]> groups = new ArrayList<>();
        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (land[r][c] == 1 && !seen[r][c]) {
                    seen[r][c] = true;
                    Deque<int[]> q = new ArrayDeque<>();
                    q.add(new int[] { r, c });
                    int minR = r,
                        maxR = r,
                        minC = c,
                        maxC = c;
                    while (!q.isEmpty()) {
                        int[] cell = q.poll();
                        minR = Math.min(minR, cell[0]);
                        maxR = Math.max(maxR, cell[0]);
                        minC = Math.min(minC, cell[1]);
                        maxC = Math.max(maxC, cell[1]);
                        for (int d = 0; d < 4; ++d) {
                            int nr = cell[0] + dr[d];
                            int nc = cell[1] + dc[d];
                            if (0 <= nr && nr < m && 0 <= nc && nc < n && land[nr][nc] == 1 && !seen[nr][nc]) {
                                seen[nr][nc] = true;
                                q.add(new int[] { nr, nc });
                            }
                        }
                    }
                    groups.add(new int[] { minR, minC, maxR, maxC });
                }
            }
        }
        return groups.toArray(new int[0][]);
    }
}
