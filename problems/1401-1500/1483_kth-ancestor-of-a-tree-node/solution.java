class TreeAncestor {

    // up[j][v] is the 2^j-th ancestor of v, or -1 when it runs past the root.
    private final int[][] up;
    private final int levels;

    public TreeAncestor(int n, int[] parent) {
        // 2^levels > n >= k, so every k fits in `levels` bits.
        int bits = 1;
        while (1 << bits <= n) {
            bits++;
        }
        this.levels = bits;
        this.up = new int[levels][n];
        System.arraycopy(parent, 0, up[0], 0, n);
        for (int j = 1; j < levels; j++) {
            int[] previous = up[j - 1];
            int[] current = up[j];
            for (int v = 0; v < n; v++) {
                // A 2^j jump is two 2^(j-1) jumps; -1 absorbs everything
                // above the root.
                int middle = previous[v];
                current[v] = middle < 0 ? -1 : previous[middle];
            }
        }
    }

    public int getKthAncestor(int node, int k) {
        if (k >= 1 << levels) {
            return -1;
        }
        for (int level = 0; k != 0 && node >= 0; level++, k >>= 1) {
            if ((k & 1) != 0) {
                node = up[level][node];
            }
        }
        return node;
    }
}
