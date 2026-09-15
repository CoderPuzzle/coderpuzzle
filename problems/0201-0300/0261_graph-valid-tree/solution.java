class Solution {

    public boolean validTree(int n, int[][] edges) {
        // A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
        // more cannot stay acyclic — any other count fails immediately.
        if (edges.length != n - 1) {
            return false;
        }
        // Union-Find over the nodes, each starting as its own component.
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        for (int[] edge : edges) {
            int ra = find(parent, edge[0]);
            int rb = find(parent, edge[1]);
            // Same root: the edge joins two nodes already in one
            // component — it closes a cycle.
            if (ra == rb) {
                return false;
            }
            // Distinct roots: merge the two components.
            parent[ra] = rb;
        }
        // All n - 1 edges merged distinct components: connected and
        // acyclic, hence a valid tree.
        return true;
    }

    // Path halving: point each visited node at its grandparent on the way
    // up, short-circuiting future traversals.
    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
