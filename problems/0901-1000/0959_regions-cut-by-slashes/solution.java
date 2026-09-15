class Solution {

    public int regionsBySlashes(String[] grid) {
        // Cut the square into four triangles per cell — top, right, bottom,
        // left — and let an iterative union-find glue them together: the
        // cell's own marking joins triangles inside the cell, and shared
        // edges join triangles across cell borders. Each surviving set is
        // exactly one region, so the answer is the number of distinct roots
        // among the 4*n*n triangles. Nothing recurses — find walks parent
        // links and compresses the walked path in loops.
        int n = grid.length;
        int[] parent = new int[4 * n * n];
        for (int x = 0; x < parent.length; ++x) {
            parent[x] = x;
        }
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                int base = 4 * (i * n + j);
                char ch = grid[i].charAt(j);
                // '/' joins top with left and right with bottom, '\' joins
                // top with right and bottom with left, a blank joins all.
                if (ch == ' ') {
                    union(parent, base, base + 1);
                    union(parent, base + 1, base + 2);
                    union(parent, base + 2, base + 3);
                } else if (ch == '/') {
                    union(parent, base, base + 3);
                    union(parent, base + 1, base + 2);
                } else {
                    union(parent, base, base + 1);
                    union(parent, base + 2, base + 3);
                }
                // The bottom triangle shares its open edge with the cell
                // below's top triangle; the right triangle with the right
                // neighbor's left triangle.
                if (i + 1 < n) {
                    union(parent, base + 2, base + 4 * n);
                }
                if (j + 1 < n) {
                    union(parent, base + 1, base + 4 + 3);
                }
            }
        }
        // Roots are exactly the self-parented nodes, so counting those
        // counts regions.
        int regions = 0;
        for (int x = 0; x < parent.length; ++x) {
            if (parent[x] == x) {
                ++regions;
            }
        }
        return regions;
    }

    private static int find(int[] parent, int x) {
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

    private static void union(int[] parent, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }
}
