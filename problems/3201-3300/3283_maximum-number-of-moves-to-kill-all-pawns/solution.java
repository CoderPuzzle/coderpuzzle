import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    private static final int[][] MOVES = {
        { -2, -1 },
        { -2, 1 },
        { -1, -2 },
        { -1, 2 },
        { 1, -2 },
        { 1, 2 },
        { 2, -1 },
        { 2, 1 },
    };

    // BFS: minimum knight moves from (sx, sy) to every square.
    private int[][] knightDistances(int sx, int sy) {
        int[][] dist = new int[50][50];
        for (int[] row : dist) {
            Arrays.fill(row, -1);
        }
        dist[sx][sy] = 0;
        Deque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] { sx, sy });
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int x = cur[0],
                y = cur[1],
                d = dist[x][y];
            for (int[] mv : MOVES) {
                int nx = x + mv[0],
                    ny = y + mv[1];
                if (nx >= 0 && nx < 50 && ny >= 0 && ny < 50 && dist[nx][ny] < 0) {
                    dist[nx][ny] = d + 1;
                    queue.add(new int[] { nx, ny });
                }
            }
        }
        return dist;
    }

    public int maxMoves(int kx, int ky, int[][] positions) {
        int m = positions.length;
        int[][][] grids = new int[m][][];
        for (int i = 0; i < m; i++) {
            grids[i] = knightDistances(positions[i][0], positions[i][1]);
        }
        int[] dStart = new int[m];
        int[][] dist = new int[m][m];
        for (int i = 0; i < m; i++) {
            dStart[i] = grids[i][kx][ky];
            for (int j = 0; j < m; j++) {
                dist[i][j] = grids[j][positions[i][0]][positions[i][1]];
            }
        }

        int full = (1 << m) - 1;
        // dp[mask][last]: best total remaining moves with `mask` captured and
        // the knight on pawn `last`. Alice maximizes on even popcount.
        int[][] dp = new int[full + 1][m];
        for (int mask = full - 1; mask >= 1; mask--) {
            int bits = Integer.bitCount(mask);
            boolean maximize = bits % 2 == 0;
            for (int last = 0; last < m; last++) {
                int best = maximize ? -1 : Integer.MAX_VALUE;
                for (int j = 0; j < m; j++) {
                    if ((mask & (1 << j)) != 0) continue;
                    int cand = dist[last][j] + dp[mask | (1 << j)][j];
                    if (maximize) {
                        if (cand > best) best = cand;
                    } else {
                        if (cand < best) best = cand;
                    }
                }
                dp[mask][last] = best;
            }
        }

        int best = -1;
        for (int j = 0; j < m; j++) {
            int cand = dStart[j] + dp[1 << j][j];
            if (cand > best) best = cand;
        }
        return best;
    }
}
