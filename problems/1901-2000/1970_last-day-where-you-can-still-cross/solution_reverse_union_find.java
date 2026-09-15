class Solution {

    public int latestDayToCross(int row, int col, int[][] cells) {
        int n = row * col;
        int top = n,
            bottom = n + 1; // virtual sentinels: one node per shore
        int[] parent = new int[n + 2];
        int[] size = new int[n + 2];
        for (int i = 0; i < n + 2; i++) {
            parent[i] = i;
            size[i] = 1;
        }
        boolean[][] active = new boolean[row][col];
        int[] dr = { 1, -1, 0, 0 };
        int[] dc = { 0, 0, 1, -1 };
        // Walk the days backwards: one cell of land reappears per step, so
        // connectivity only grows. After absorbing cells[i] the grid state is
        // exactly "day i" (cells[:i] still flooded), so the first moment the
        // shores share a root, day i is the last crossable day.
        for (int i = n - 1; i >= 0; i--) {
            int r = cells[i][0] - 1,
                c = cells[i][1] - 1;
            active[r][c] = true;
            int land = r * col + c;
            if (r == 0) union(parent, size, land, top);
            if (r == row - 1) union(parent, size, land, bottom);
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d],
                    nc = c + dc[d];
                if (nr >= 0 && nr < row && nc >= 0 && nc < col && active[nr][nc]) {
                    union(parent, size, land, nr * col + nc);
                }
            }
            if (find(parent, top) == find(parent, bottom)) return i; // shores met
        }
        return 0; // unreachable: with row, col >= 2 even day 1 always crosses
    }

    private int find(int[] parent, int x) {
        // Path halving keeps the trees flat without a second pass.
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int[] parent, int[] size, int a, int b) {
        int rootA = find(parent, a),
            rootB = find(parent, b);
        if (rootA == rootB) return;
        // Union by size: hang the smaller tree under the larger.
        if (size[rootA] < size[rootB]) {
            int tmp = rootA;
            rootA = rootB;
            rootB = tmp;
        }
        parent[rootB] = rootA;
        size[rootA] += size[rootB];
    }
}
