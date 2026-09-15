import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int maximumSafenessFactor(int[][] grid) {
        int n = grid.length;
        // Multi-source BFS from every thief at once: wavefront exploration
        // makes dist[r][c] the minimum grid steps to the nearest thief —
        // exactly the cell's safeness value.
        int[][] dist = new int[n][n];
        for (int[] row : dist) {
            java.util.Arrays.fill(row, -1);
        }
        Deque<int[]> q = new ArrayDeque<>();
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    dist[r][c] = 0;
                    q.add(new int[] { r, c });
                }
            }
        }
        int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0],
                c = cur[1];
            for (int[] d : dirs) {
                int nr = r + d[0],
                    nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.add(new int[] { nr, nc });
                }
            }
        }

        // A path has factor >= threshold iff the corners stay connected
        // after deleting cells with dist < threshold, and that reachability
        // is monotone in the threshold — so binary search the largest
        // feasible v over [0, 2n]. A thief on a corner pins its dist to 0,
        // capping the answer at 0.
        int lo = 0,
            hi = 2 * n,
            ans = 0;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (reachable(dist, n, mid, dirs)) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }

    private boolean reachable(int[][] dist, int n, int threshold, int[][] dirs) {
        // Endpoints below the threshold can never connect; otherwise a
        // plain BFS over cells with dist >= threshold decides.
        if (dist[0][0] < threshold || dist[n - 1][n - 1] < threshold) {
            return false;
        }
        boolean[][] seen = new boolean[n][n];
        seen[0][0] = true;
        Deque<int[]> dq = new ArrayDeque<>();
        dq.add(new int[] { 0, 0 });
        while (!dq.isEmpty()) {
            int[] cur = dq.poll();
            int r = cur[0],
                c = cur[1];
            if (r == n - 1 && c == n - 1) {
                return true;
            }
            for (int[] d : dirs) {
                int nr = r + d[0],
                    nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !seen[nr][nc] && dist[nr][nc] >= threshold) {
                    seen[nr][nc] = true;
                    dq.add(new int[] { nr, nc });
                }
            }
        }
        return false;
    }
}
