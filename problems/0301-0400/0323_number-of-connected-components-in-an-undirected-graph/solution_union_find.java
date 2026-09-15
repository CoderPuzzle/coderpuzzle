class Solution {

    public int countComponents(int n, int[][] edges) {
        int[] parent = new int[n];
        for (int i = 0; i < n; ++i) parent[i] = i;
        // Every node begins as its own component.
        int count = n;
        for (int[] e : edges) {
            int ra = find(parent, e[0]);
            int rb = find(parent, e[1]);
            // An edge joining two distinct roots merges two components;
            // one whose endpoints already share a root is redundant.
            if (ra != rb) {
                parent[ra] = rb;
                --count;
            }
        }
        return count;
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
