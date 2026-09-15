class Solution {

    public int[] minimumFlips(int n, int[][] edges, String start, String target) {
        int[][] adjacency = new int[n][];
        int[] degree = new int[n];
        for (int[] edge : edges) {
            degree[edge[0]]++;
            degree[edge[1]]++;
        }
        for (int x = 0; x < n; x++) {
            adjacency[x] = new int[degree[x] * 2];
            degree[x] = 0;
        }
        for (int index = 0; index < edges.length; index++) {
            int u = edges[index][0],
                v = edges[index][1];
            adjacency[u][degree[u] * 2] = v;
            adjacency[u][degree[u] * 2 + 1] = index;
            degree[u]++;
            adjacency[v][degree[v] * 2] = u;
            adjacency[v][degree[v] * 2 + 1] = index;
            degree[v]++;
        }

        // Breadth-first discovery from node 0 records each node's parent
        // and the edge leading to it; an explicit queue keeps deep trees
        // off the call stack.
        int[] parent = new int[n];
        int[] parentEdge = new int[n];
        parent[0] = -1;
        int[] order = new int[n];
        int discovered = 1;
        for (int i = 0; i < discovered; i++) {
            int node = order[i];
            for (int j = 0; j < adjacency[node].length; j += 2) {
                int neighbor = adjacency[node][j];
                int edge = adjacency[node][j + 1];
                if (neighbor != parent[node]) {
                    parent[neighbor] = node;
                    parentEdge[neighbor] = edge;
                    order[discovered++] = neighbor;
                }
            }
        }

        // need[node] stays 1 while the node's flip parity is unmatched.
        boolean[] need = new boolean[n];
        for (int x = 0; x < n; x++) {
            need[x] = start.charAt(x) != target.charAt(x);
        }
        boolean[] take = new boolean[n - 1];
        for (int i = n - 1; i >= 1; i--) {
            int node = order[i];
            if (need[node]) {
                // Children are done, so the parent edge is the only
                // remaining toggle touching this node: the choice is
                // forced, and the unmatched parity moves to the parent.
                take[parentEdge[node]] = true;
                need[parent[node]] ^= true;
            }
        }
        // Whatever parity survives at the root cannot be fixed anywhere.
        if (need[0]) {
            return new int[] { -1 };
        }
        // A final ascending scan emits the chosen indices in order.
        int count = 0;
        for (boolean chosen : take) {
            if (chosen) {
                count++;
            }
        }
        int[] result = new int[count];
        int next = 0;
        for (int index = 0; index < n - 1; index++) {
            if (take[index]) {
                result[next++] = index;
            }
        }
        return result;
    }
}
