class Solution {

    public boolean validPath(int n, int[][] edges, int source, int destination) {
        // No graph is built and nothing is traversed: every edge simply
        // merges the components of its two endpoints, and afterwards a
        // route exists exactly when source and destination were pulled
        // into the same component -- that is, when they share a root.
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        for (int[] edge : edges) {
            int ru = find(parent, edge[0]);
            int rv = find(parent, edge[1]);
            if (ru != rv) {
                parent[ru] = rv;
            }
        }
        return find(parent, source) == find(parent, destination);
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
