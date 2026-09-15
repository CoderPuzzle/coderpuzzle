import java.util.Arrays;

class Solution {

    private int[] parent;
    private int[] size;

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b) {
        int ra = find(a),
            rb = find(b);
        if (ra == rb) return;
        if (size[ra] < size[rb]) {
            int t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    }

    public int[] hitBricks(int[][] grid, int[][] hits) {
        int m = grid.length,
            n = grid[0].length;
        int top = m * n;
        parent = new int[top + 1];
        for (int i = 0; i <= top; i++) parent[i] = i;
        size = new int[top + 1];
        Arrays.fill(size, 1);
        size[top] = 0;

        // Final grid after all hits are applied.
        int[][] g = new int[m][n];
        for (int r = 0; r < m; r++) g[r] = grid[r].clone();
        for (int[] hit : hits) g[hit[0]][hit[1]] = 0;

        int[] dr = { -1, 1, 0, 0 };
        int[] dc = { 0, 0, -1, 1 };

        // Union all remaining bricks with each other and with the virtual top.
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (g[r][c] == 1) {
                    if (r == 0) union(r * n + c, top);
                    if (r + 1 < m && g[r + 1][c] == 1) union(r * n + c, (r + 1) * n + c);
                    if (c + 1 < n && g[r][c + 1] == 1) union(r * n + c, r * n + c + 1);
                }
            }
        }

        int[] res = new int[hits.length];
        for (int k = hits.length - 1; k >= 0; k--) {
            int r = hits[k][0],
                c = hits[k][1];
            if (grid[r][c] != 1) continue;
            int before = size[find(top)];
            g[r][c] = 1;
            if (r == 0) union(r * n + c, top);
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d],
                    nc = c + dc[d];
                if (0 <= nr && nr < m && 0 <= nc && nc < n && g[nr][nc] == 1) {
                    union(r * n + c, nr * n + nc);
                }
            }
            int after = size[find(top)];
            res[k] = Math.max(0, after - before - 1);
        }
        return res;
    }
}
