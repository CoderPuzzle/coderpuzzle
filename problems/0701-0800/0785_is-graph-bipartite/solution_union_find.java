class Solution {

    private int[] parent;

    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        // Bipartite means the nodes split into two groups with every edge
        // crossing between them, so all of a node's neighbors must be able
        // to share the one opposite group.
        for (int u = 0; u < n; u++) {
            for (int v = 1; v < graph[u].length; v++) {
                // Union u's enemies together: they all belong to one set.
                union(graph[u][0], graph[u][v]);
            }
        }
        // A node sharing a set with one of its own enemies sits inside an
        // odd cycle: not bipartite.
        for (int u = 0; u < n; u++) {
            for (int v : graph[u]) {
                if (find(u) == find(v)) {
                    return false;
                }
            }
        }
        return true;
    }

    private int find(int node) {
        int root = node;
        while (parent[root] != root) {
            root = parent[root];
        }
        // Second walk repoints every visited node at the root (path
        // compression), flattening the structure for later finds.
        while (parent[node] != root) {
            int next = parent[node];
            parent[node] = root;
            node = next;
        }
        return root;
    }

    private void union(int a, int b) {
        parent[find(a)] = find(b);
    }
}
