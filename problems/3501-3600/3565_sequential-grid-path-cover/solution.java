class Solution {

    private int m, n, total;
    private int[][] grid;
    private boolean[][] visited;
    private int[] remaining = new int[2];
    private int[][] path;
    private static final int[][] DELTAS = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };

    public int[][] findPath(int[][] grid, int k) {
        // Backtrack over the walk, entering waypoint w only as the w-th
        // waypoint. Two prunes keep the 5x5 worst case instant: the
        // remaining cells must still balance by color (the walk strictly
        // alternates colors), and the unvisited region must stay connected.
        this.grid = grid;
        m = grid.length;
        n = grid[0].length;
        total = m * n;
        visited = new boolean[m][n];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                remaining[(r + c) % 2]++;
            }
        }
        path = new int[total][2];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if ((grid[r][c] == 0 || grid[r][c] == 1) && dfs(r, c, 0, 1)) {
                    int[][] result = new int[total][2];
                    System.arraycopy(path, 0, result, 0, total);
                    return result;
                }
            }
        }
        return new int[0][];
    }

    private boolean connected() {
        int unvisitedCount = 0;
        int start = -1;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (!visited[r][c]) {
                    unvisitedCount++;
                    start = r * n + c;
                }
            }
        }
        if (unvisitedCount == 0) {
            return true;
        }
        boolean[] seen = new boolean[m * n];
        seen[start] = true;
        int[] stack = new int[m * n];
        int top = 0;
        stack[top++] = start;
        int reached = 0;
        while (top > 0) {
            int flat = stack[--top];
            reached++;
            int r = flat / n;
            int c = flat % n;
            for (int[] delta : DELTAS) {
                int nr = r + delta[0];
                int nc = c + delta[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && !seen[nr * n + nc]) {
                    seen[nr * n + nc] = true;
                    stack[top++] = nr * n + nc;
                }
            }
        }
        return reached == unvisitedCount;
    }

    private boolean dfs(int r, int c, int count, int nxt) {
        int value = grid[r][c];
        if (value != 0 && value != nxt) {
            return false;
        }
        visited[r][c] = true;
        path[count][0] = r;
        path[count][1] = c;
        if (value == nxt) {
            nxt++;
        }
        count++;
        int color = (r + c) % 2;
        remaining[color]--;
        boolean ok = false;
        if (count == total) {
            ok = true;
        } else {
            int left = total - count;
            // The rest of the walk alternates colors, starting on the
            // opposite color of the current cell.
            if (remaining[1 - color] == (left + 1) / 2 && remaining[color] == left / 2 && connected()) {
                for (int[] delta : DELTAS) {
                    int nr = r + delta[0];
                    int nc = c + delta[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && dfs(nr, nc, count, nxt)) {
                        ok = true;
                        break;
                    }
                }
            }
        }
        if (!ok) {
            visited[r][c] = false;
        }
        remaining[color]++;
        return ok;
    }
}
