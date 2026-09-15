import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

class Solution {

    private static final int INF = Integer.MAX_VALUE / 2; // above every reachable time (including 1e9 waits)
    private static final int[] DI = { 1, -1, 0, 0 };
    private static final int[] DJ = { 0, 0, 1, -1 };

    public int maximumMinutes(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;

        // fire spread is independent of where you walk: one multi-source BFS
        // gives fire[i][j] = earliest minute fire occupies each cell
        int[][] fire = new int[m][n];
        for (int[] row : fire) {
            Arrays.fill(row, INF);
        }
        Deque<int[]> queue = new ArrayDeque<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    fire[i][j] = 0;
                    queue.add(new int[] { i, j });
                }
            }
        }
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int i = cur[0],
                j = cur[1];
            for (int d = 0; d < 4; d++) {
                int ni = i + DI[d];
                int nj = j + DJ[d];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] != 2 && fire[ni][nj] == INF) {
                    fire[ni][nj] = fire[i][j] + 1;
                    queue.add(new int[] { ni, nj });
                }
            }
        }

        // sentinels first: -1 if even waiting 0 fails; the 1e9 sentinel means
        // fire can never pin you down. Survivability is monotone in wait, so
        // binary search the largest survivable wait.
        if (!canReach(grid, fire, 0)) {
            return -1;
        }
        if (canReach(grid, fire, 1_000_000_000)) {
            return 1_000_000_000;
        }

        int lo = 0,
            hi = 1_000_000_000;
        while (lo < hi) {
            // upper mid: when survivable, lo moves up to mid without stalling
            int mid = lo + (hi - lo + 1) / 2;
            if (canReach(grid, fire, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private boolean canReach(int[][] grid, int[][] fire, int wait) {
        int m = grid.length;
        int n = grid[0].length;
        // the start cell must still be fire-free the moment you set out
        if (wait >= fire[0][0]) {
            return false;
        }
        boolean[][] seen = new boolean[m][n];
        seen[0][0] = true;
        Deque<int[]> dq = new ArrayDeque<>();
        dq.add(new int[] { 0, 0, wait });
        while (!dq.isEmpty()) {
            int[] cur = dq.poll();
            int i = cur[0],
                j = cur[1],
                t = cur[2];
            if (i == m - 1 && j == n - 1) {
                return true;
            }
            for (int d = 0; d < 4; d++) {
                int ni = i + DI[d];
                int nj = j + DJ[d];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] != 2 && !seen[ni][nj]) {
                    int nt = t + 1;
                    // the safehouse may tie the fire: reaching it the very
                    // minute fire does still counts as escaping
                    if (ni == m - 1 && nj == n - 1) {
                        if (nt <= fire[ni][nj]) {
                            seen[ni][nj] = true;
                            dq.add(new int[] { ni, nj, nt });
                        }
                    } else {
                        // you move, then fire spreads: an ordinary cell is
                        // safe only if fire arrives strictly later than you
                        if (nt < fire[ni][nj]) {
                            seen[ni][nj] = true;
                            dq.add(new int[] { ni, nj, nt });
                        }
                    }
                }
            }
        }
        return false;
    }
}
