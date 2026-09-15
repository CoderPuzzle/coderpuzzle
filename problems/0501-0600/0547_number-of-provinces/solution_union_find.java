class Solution {

    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        int[] parent = new int[n];
        for (int i = 0; i < n; ++i) parent[i] = i;
        // Every city begins as its own province; only a
        // successful union ever reduces the count.
        int provinces = n;
        // The matrix is symmetric, so scanning pairs i < j feeds every
        // road to the union exactly once; the diagonal is skipped.
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (isConnected[i][j] == 1) {
                    int ri = find(parent, i);
                    int rj = find(parent, j);
                    // A road joining two distinct roots merges two provinces;
                    // one whose cities already share a root is redundant.
                    if (ri != rj) {
                        parent[ri] = rj;
                        --provinces;
                    }
                }
            }
        }
        return provinces;
    }

    // Path-halving: splice every other node directly under its
    // grandparent, flattening the tree while walking to the root.
    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
