import java.util.Arrays;

class Solution {

    public int[] findRedundantDirectedConnection(int[][] edges) {
        // First pass: a node with two parents names the two candidate
        // edges, in input order.
        int n = edges.length;
        int[] parentEdge = new int[n + 1];
        Arrays.fill(parentEdge, -1);
        int cand1 = -1;
        int cand2 = -1;
        for (int i = 0; i < n; ++i) {
            int v = edges[i][1];
            if (parentEdge[v] != -1) {
                cand1 = parentEdge[v];
                cand2 = i;
            } else {
                parentEdge[v] = i;
            }
        }

        int[] dsu = new int[n + 1];
        for (int node = 0; node <= n; ++node) {
            dsu[node] = node;
        }

        // Second pass over every edge except the later candidate: a cycle
        // means dropping it is not enough, so the earlier edge is the
        // answer; a clean pass means the later edge is.
        for (int i = 0; i < n; ++i) {
            if (i == cand2) {
                continue;
            }
            int ru = find(dsu, edges[i][0]);
            int rv = find(dsu, edges[i][1]);
            // Equal roots mean this edge would reconnect one component.
            if (ru == rv) {
                return cand2 != -1 ? edges[cand1] : edges[i];
            }
            dsu[ru] = rv;
        }
        return edges[cand2];
    }

    private int find(int[] dsu, int node) {
        int root = node;
        while (dsu[root] != root) {
            root = dsu[root];
        }
        // Second walk repoints every visited node at the root (path
        // compression), flattening the structure for later finds.
        while (dsu[node] != root) {
            int next = dsu[node];
            dsu[node] = root;
            node = next;
        }
        return root;
    }
}
