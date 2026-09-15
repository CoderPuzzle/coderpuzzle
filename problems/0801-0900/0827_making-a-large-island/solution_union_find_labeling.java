class Solution {

    public int largestIsland(int[][] grid) {
        int n = grid.length;
        int cells = n * n;
        // Disjoint-set forest over the cells: parent[i*n+j] points at the
        // cell's current representative, and size is maintained per
        // representative only. Union by size plus path compression keeps
        // the trees nearly flat.
        int[] parent = new int[cells];
        int[] size = new int[cells];
        for (int idx = 0; idx < cells; idx++) {
            parent[idx] = idx;
            size[idx] = 1;
        }

        // One row-major pass: each 1-cell joins the (already processed)
        // 1-cell to its left and the one above, so every island is
        // assembled edge by edge and no traversal stack is needed.
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    int idx = i * n + j;
                    if (j > 0 && grid[i][j - 1] == 1) {
                        unite(parent, size, idx, idx - 1);
                    }
                    if (i > 0 && grid[i - 1][j] == 1) {
                        unite(parent, size, idx, idx - n);
                    }
                }
            }
        }

        // Best starts at the largest existing island — also the answer
        // when the grid is all 1s and no 0 exists to flip.
        int best = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    best = Math.max(best, size[find(parent, i * n + j)]);
                }
            }
        }
        int[] di = { 1, -1, 0, 0 };
        int[] dj = { 0, 0, 1, -1 };
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 0) {
                    // Dedup matters: one island can touch this 0 on
                    // several sides, and counting it twice would
                    // overstate the merge. At most four neighbours can
                    // carry at most four roots, so a four-slot scan
                    // replaces the canonical color set.
                    int[] roots = new int[4];
                    int count = 0;
                    int total = 1;
                    for (int d = 0; d < 4; d++) {
                        int ni = i + di[d];
                        int nj = j + dj[d];
                        if (ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] == 1) {
                            int root = find(parent, ni * n + nj);
                            boolean dup = false;
                            for (int k = 0; k < count; k++) {
                                if (roots[k] == root) {
                                    dup = true;
                                    break;
                                }
                            }
                            if (!dup) {
                                roots[count] = root;
                                count++;
                                total += size[root];
                            }
                        }
                    }
                    best = Math.max(best, total);
                }
            }
        }
        return best;
    }

    private int find(int[] parent, int x) {
        int root = x;
        while (parent[root] != root) {
            root = parent[root];
        }
        while (parent[x] != root) {
            int next = parent[x];
            parent[x] = root;
            x = next;
        }
        return root;
    }

    private void unite(int[] parent, int[] size, int a, int b) {
        a = find(parent, a);
        b = find(parent, b);
        if (a == b) {
            return;
        }
        if (size[a] < size[b]) {
            int t = a;
            a = b;
            b = t;
        }
        parent[b] = a;
        size[a] += size[b];
    }
}
