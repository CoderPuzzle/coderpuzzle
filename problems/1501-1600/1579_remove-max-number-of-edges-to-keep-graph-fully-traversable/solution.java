class Solution {

    // Disjoint-set union with path compression and union-by-size: two
    // independent copies track what Alice and Bob can each reach, but
    // every Type 3 edge is unioned into both copies at once, since it
    // serves both of them for free.
    private static final class DisjointSet {

        int[] parent;
        int components;

        DisjointSet(int size) {
            parent = new int[size + 1];
            for (int i = 0; i <= size; i++) parent[i] = i;
            components = size;
        }

        int find(int node) {
            while (parent[node] != node) {
                parent[node] = parent[parent[node]];
                node = parent[node];
            }
            return node;
        }

        boolean union(int a, int b) {
            int rootA = find(a),
                rootB = find(b);
            if (rootA == rootB) return false;
            parent[rootA] = rootB;
            components--;
            return true;
        }
    }

    public int maxNumEdgesToRemove(int n, int[][] edges) {
        DisjointSet alice = new DisjointSet(n);
        DisjointSet bob = new DisjointSet(n);
        int used = 0;

        // Type 3 edges go first: whichever ones actually merge two
        // components help both Alice and Bob simultaneously, so they are
        // never worse than spending a Type 1 and a Type 2 edge instead.
        for (int[] edge : edges) {
            if (edge[0] == 3) {
                boolean mergedAlice = alice.union(edge[1], edge[2]);
                boolean mergedBob = bob.union(edge[1], edge[2]);
                if (mergedAlice || mergedBob) used++;
            }
        }

        // Type 1 (Alice-only) and Type 2 (Bob-only) edges fill in whatever
        // the shared edges left disconnected, each within its own copy.
        for (int[] edge : edges) {
            if (edge[0] == 1) {
                if (alice.union(edge[1], edge[2])) used++;
            } else if (edge[0] == 2) {
                if (bob.union(edge[1], edge[2])) used++;
            }
        }

        if (alice.components != 1 || bob.components != 1) return -1;
        return edges.length - used;
    }
}
