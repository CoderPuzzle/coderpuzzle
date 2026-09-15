import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    private int m, n;
    private String[][] g;
    private static final int[][] DIRS = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };

    public int minimumSeconds(String[][] land) {
        m = land.length;
        n = land[0].length;
        g = land;
        final int INF = m * n + 1; // later than any reachable second
        int sr = 0,
            sc = 0,
            dr = 0,
            dc = 0;
        // Water BFS: arrival time of every empty cell. Only '.' floods,
        // so 'S', 'D' and 'X' stay dry (the statement guarantees it for
        // 'D').
        int[][] flood = new int[m][n];
        Deque<int[]> water = new ArrayDeque<>();
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                flood[r][c] = INF;
                if (g[r][c].equals("*")) {
                    flood[r][c] = 0;
                    water.add(new int[] { r, c });
                } else if (g[r][c].equals("S")) {
                    sr = r;
                    sc = c;
                } else if (g[r][c].equals("D")) {
                    dr = r;
                    dc = c;
                }
            }
        }
        while (!water.isEmpty()) {
            int[] cur = water.poll();
            int step = flood[cur[0]][cur[1]] + 1;
            for (int[] d : DIRS) {
                int nr = cur[0] + d[0],
                    nc = cur[1] + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                if (!g[nr][nc].equals(".") || flood[nr][nc] != INF) continue;
                flood[nr][nc] = step;
                water.add(new int[] { nr, nc });
            }
        }
        // Person BFS: enter '.'/'D' strictly before the water does; the
        // same-second landing ban is the strict '<'.
        boolean[][] seen = new boolean[m][n];
        seen[sr][sc] = true;
        Deque<int[]> queue = new ArrayDeque<>(); // r c t
        queue.add(new int[] { sr, sc, 0 });
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            if (cur[0] == dr && cur[1] == dc) return cur[2];
            for (int[] d : DIRS) {
                int nr = cur[0] + d[0],
                    nc = cur[1] + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                if (seen[nr][nc]) continue;
                boolean walk = g[nr][nc].equals(".") || g[nr][nc].equals("D");
                if (!walk || cur[2] + 1 >= flood[nr][nc]) continue;
                seen[nr][nc] = true;
                queue.add(new int[] { nr, nc, cur[2] + 1 });
            }
        }
        return -1;
    }
}
