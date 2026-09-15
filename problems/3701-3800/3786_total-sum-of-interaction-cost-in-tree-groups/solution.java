import java.util.ArrayList;
import java.util.List;

class Solution {

    public long interactionCosts(int n, int[][] edges, int[] group) {
        // One slot per group label; labels are 1..20.
        final int labels = 21;

        List<List<Integer>> adjacency = new ArrayList<>();
        for (int node = 0; node < n; node++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
        }

        long[] total = new long[labels];
        for (int label : group) {
            ++total[label];
        }

        // Breadth-first discovery from node 0 records each node's parent;
        // an explicit queue keeps deep trees off the call stack.
        int[] parent = new int[n];
        parent[0] = -1;
        int[] order = new int[n];
        int found = 0;
        order[found++] = 0;
        for (int index = 0; index < found; index++) {
            int node = order[index];
            for (int neighbor : adjacency.get(node)) {
                if (neighbor != parent[node]) {
                    parent[neighbor] = node;
                    order[found++] = neighbor;
                }
            }
        }

        // counts[node][label] = same-label nodes inside node's subtree.
        // Reverse discovery order visits children before parents, so each
        // vector is complete when its node's turn comes.
        long[][] counts = new long[n][labels];
        long answer = 0;
        for (int index = found - 1; index >= 1; index--) {
            int node = order[index];
            long[] subtree = counts[node];
            ++subtree[group[node]];
            long[] above = counts[parent[node]];
            for (int label = 1; label < labels; label++) {
                long inside = subtree[label];
                if (inside > 0) {
                    // Every same-group pair split by the parent edge pays
                    // exactly one unit on this edge.
                    answer += inside * (total[label] - inside);
                    above[label] += inside;
                }
            }
        }
        return answer;
    }
}
