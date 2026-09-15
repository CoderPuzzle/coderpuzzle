import java.util.ArrayList;
import java.util.List;

class Solution {

    public int longestCycle(int[] edges) {
        int n = edges.length;
        // Count in-edges first; a node nobody points at is a queue seed.
        // edges[i] == -1 points nowhere and counts for nothing.
        int[] indeg = new int[n];
        for (int v : edges) {
            if (v != -1) indeg[v] += 1;
        }
        // Kahn-style peel: repeatedly remove in-degree-0 nodes, dropping the
        // in-edge their out-edge contributed to a successor. What survives
        // the queue is exactly the set of cycle nodes.
        List<Integer> queue = new ArrayList<>();
        for (int u = 0; u < n; u++) {
            if (indeg[u] == 0) queue.add(u);
        }
        int head = 0;
        while (head < queue.size()) {
            int u = queue.get(head);
            head += 1;
            int w = edges[u];
            if (w != -1) {
                indeg[w] -= 1;
                if (indeg[w] == 0) queue.add(w);
            }
        }
        // Each survivor lies on a ring: walk it once, zeroing indeg as nodes
        // are counted so the walk stops exactly where it started.
        int best = -1;
        for (int start = 0; start < n; start++) {
            if (indeg[start] == 0) continue;
            int len = 0;
            int node = start;
            while (indeg[node] > 0) {
                indeg[node] = 0;
                len += 1;
                node = edges[node];
            }
            best = Math.max(best, len);
        }
        return best;
    }
}
