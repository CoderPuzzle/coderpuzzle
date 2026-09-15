import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] maxSubgraphScore(int n, int[][] edges, int[] good) {
        final long NEG = (long) -1e18;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Iterative DFS (explicit stack): safe on deep trees; records parent,
        // children, and an order where every parent precedes its children.
        int[] parent = new int[n];
        java.util.Arrays.fill(parent, -1);
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        List<Integer> order = new ArrayList<>();
        java.util.ArrayDeque<Integer> stack = new java.util.ArrayDeque<>();
        parent[0] = -2;
        stack.push(0);
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order.add(u);
            for (int v : adj.get(u)) {
                if (v == parent[u]) continue;
                parent[v] = u;
                children.get(u).add(v);
                stack.push(v);
            }
        }

        // +1 for good, -1 for bad: a connected subgraph's score is its weight
        // sum, so the task is the max-weight connected subgraph through u.
        int[] weight = new int[n];
        for (int i = 0; i < n; i++) weight[i] = good[i] != 0 ? 1 : -1;

        // down[u]: best score of a connected subgraph confined to u's subtree:
        // weight[u] plus each child's down only when positive, pruning harmful
        // branches. Reverse order computes children before parents.
        long[] down = new long[n];
        for (int i = order.size() - 1; i >= 0; i--) {
            int u = order.get(i);
            long s = weight[u];
            for (int c : children.get(u)) {
                if (down[c] > 0) s += down[c];
            }
            down[u] = s;
        }

        // up[u]: best connected piece reaching u only through its parent side
        // (u's own subtree excluded); the NEG sentinel gives the root none.
        long[] up = new long[n];
        up[0] = NEG;
        long[] resultLong = new long[n];
        // Reroot in one preorder pass: each child inherits the parent plus
        // u's other worthwhile branches plus what the rest of the tree gave
        // u; dropping the child's own positive part keeps sides disjoint.
        for (int u : order) {
            long totalPos = 0;
            for (int c : children.get(u)) totalPos += Math.max(0L, down[c]);
            for (int c : children.get(u)) {
                up[c] = weight[u] + (totalPos - Math.max(0L, down[c])) + Math.max(0L, up[u]);
            }
            // Answer for u: its weight, its positive child branches, and the
            // optional parent-side piece.
            resultLong[u] = weight[u] + totalPos + Math.max(0L, up[u]);
        }
        int[] result = new int[n];
        for (int i = 0; i < n; i++) result[i] = (int) resultLong[i];
        return result;
    }
}
