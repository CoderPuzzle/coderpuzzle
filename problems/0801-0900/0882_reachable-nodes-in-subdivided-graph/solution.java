import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int reachableNodes(int[][] edges, int maxMoves, int n) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        // Subdividing [u, v, cnt] yields cnt + 1 unit edges, so Dijkstra on
        // the compact graph with weight cnt + 1 gives the true distances.
        for (int[] e : edges) {
            int u = e[0],
                v = e[1],
                cnt = e[2];
            adj.get(u).add(new int[] { v, cnt + 1 });
            adj.get(v).add(new int[] { u, cnt + 1 });
        }
        long INF = Long.MAX_VALUE;
        long[] dist = new long[n];
        Arrays.fill(dist, INF);
        dist[0] = 0;
        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        pq.add(new long[] { 0, 0 });
        while (!pq.isEmpty()) {
            long[] top = pq.poll();
            long d = top[0];
            int u = (int) top[1];
            // Lazy deletion: a stale heap entry no longer matches dist[u].
            if (d != dist[u]) {
                continue;
            }
            for (int[] nb : adj.get(u)) {
                int v = nb[0];
                long nd = d + nb[1];
                if (nd < dist[v]) {
                    dist[v] = nd;
                    pq.add(new long[] { nd, v });
                }
            }
        }
        long result = 0;
        // Half one: original nodes within the budget.
        for (long d : dist) {
            if (d <= maxMoves) {
                result += 1;
            }
        }
        // Half two: each edge contributes the frontiers walked in from both
        // ends; min(cnt, a + b) clamps the overlap where they meet.
        for (int[] e : edges) {
            int u = e[0],
                v = e[1],
                cnt = e[2];
            long a = Math.max(0, maxMoves - dist[u]);
            long b = Math.max(0, maxMoves - dist[v]);
            result += Math.min(cnt, a + b);
        }
        return (int) result;
    }
}
