import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int minimumDiameterAfterMerge(int[][] edges1, int[][] edges2) {
        // Whatever the attachment pair, the merged diameter is the max of
        // three candidates: each original diameter, and the path that
        // crosses the new edge -- deepest leg of tree 1 from its
        // attachment node, plus deepest leg of tree 2, plus 1. Only the
        // third term depends on the choice, and the minimum over
        // attachment nodes of the deepest leg is the radius
        // ceil(d / 2). So connect the two centers: answer =
        // max(d1, d2, ceil(d1/2) + ceil(d2/2) + 1). Each diameter comes
        // from two strictly iterative BFS sweeps (array-backed queues
        // with a read head); with 1e5 nodes recursion is not an option.
        int d1 = diameter(edges1);
        int d2 = diameter(edges2);
        int cross = (d1 + 1) / 2 + (d2 + 1) / 2 + 1;
        return Math.max(Math.max(d1, d2), cross);
    }

    private int diameter(int[][] edges) {
        int n = edges.length + 1;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        return sweep(adj, sweep(adj, 0).far).best;
    }

    private Sweep sweep(List<List<Integer>> adj, int src) {
        int n = adj.size();
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        dist[src] = 0;
        int[] queue = new int[n];
        int head = 0,
            tail = 0;
        queue[tail++] = src;
        int far = src,
            best = 0;
        while (head < tail) {
            int u = queue[head++];
            for (int v : adj.get(u)) {
                if (dist[v] < 0) {
                    dist[v] = dist[u] + 1;
                    if (dist[v] > best) {
                        far = v;
                        best = dist[v];
                    }
                    queue[tail++] = v;
                }
            }
        }
        return new Sweep(far, best);
    }

    private record Sweep(int far, int best) {}
}
