import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    private int m, n;
    private String[][] g;
    private static final int[][] DELTAS = { { 0, -1 }, { 0, 1 }, { -1, 0 }, { 1, 0 } };

    private boolean free(int r, int c) {
        return r >= 0 && r < m && c >= 0 && c < n && !g[r][c].equals("#");
    }

    // Cells the player can walk to with the box as an obstacle.
    private void reachable(boolean[][] seen, int br, int bc, int sr, int sc) {
        Deque<int[]> queue = new ArrayDeque<>();
        seen[sr][sc] = true;
        queue.add(new int[] { sr, sc });
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            for (int[] d : DELTAS) {
                int nr = cur[0] + d[0],
                    nc = cur[1] + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                if ((nr == br && nc == bc) || seen[nr][nc] || g[nr][nc].equals("#")) continue;
                seen[nr][nc] = true;
                queue.add(new int[] { nr, nc });
            }
        }
    }

    // State: (box cell, side of the player). After a push along DELTAS[i]
    // the player ends up standing on side i of the new box cell. Each edge
    // is one push, so BFS yields minimal pushes.
    public int minPushBox(String[][] grid) {
        m = grid.length;
        n = grid[0].length;
        g = grid;
        int boxR = 0,
            boxC = 0,
            playR = 0,
            playC = 0,
            targR = 0,
            targC = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c].equals("B")) {
                    boxR = r;
                    boxC = c;
                } else if (grid[r][c].equals("S")) {
                    playR = r;
                    playC = c;
                } else if (grid[r][c].equals("T")) {
                    targR = r;
                    targC = c;
                }
            }
        }
        Set<Long> visited = new HashSet<>();
        Deque<int[]> queue = new ArrayDeque<>(); // br bc side pushes
        boolean[][] around = new boolean[m][n];
        reachable(around, boxR, boxC, playR, playC);
        for (int i = 0; i < 4; ++i) {
            int standR = boxR + DELTAS[i][0],
                standC = boxC + DELTAS[i][1];
            int destR = boxR - DELTAS[i][0],
                destC = boxC - DELTAS[i][1];
            if (!free(standR, standC) || !free(destR, destC)) continue;
            if (!around[standR][standC]) continue;
            long key = ((long) (destR * n + destC) << 2) | i;
            visited.add(key);
            queue.add(new int[] { destR, destC, i, 1 });
        }
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int br = cur[0],
                bc = cur[1],
                side = cur[2],
                pushes = cur[3];
            if (br == targR && bc == targC) return pushes;
            boolean[][] seen = new boolean[m][n];
            reachable(seen, br, bc, br + DELTAS[side][0], bc + DELTAS[side][1]);
            for (int i = 0; i < 4; ++i) {
                int standR = br + DELTAS[i][0],
                    standC = bc + DELTAS[i][1];
                int destR = br - DELTAS[i][0],
                    destC = bc - DELTAS[i][1];
                if (!free(standR, standC) || !free(destR, destC)) continue;
                if (!seen[standR][standC]) continue;
                long key = ((long) (destR * n + destC) << 2) | i;
                if (visited.contains(key)) continue;
                visited.add(key);
                queue.add(new int[] { destR, destC, i, pushes + 1 });
            }
        }
        return -1;
    }
}
