import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public boolean[] findAnswer(int n, int[][] edges) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[] { e[1], e[2] });
            adj.get(e[1]).add(new int[] { e[0], e[2] });
        }

        long[] dist0 = dijkstra(n, adj, 0);
        long[] distN = dijkstra(n, adj, n - 1);
        // reference length every shortest 0 -> n-1 path must match
        long total = dist0[n - 1];
        boolean[] ans = new boolean[edges.length];
        // unreachable: no edge lies on a shortest path
        if (total == Long.MAX_VALUE) {
            return ans;
        }
        for (int i = 0; i < edges.length; i++) {
            // on a shortest path iff d0(one end) + w + dN(other end) == total,
            // tested both ways since the undirected edge may be crossed either way
            int u = edges[i][0], v = edges[i][1], w = edges[i][2];
            if (dist0[u] + w + distN[v] == total || dist0[v] + w + distN[u] == total) {
                ans[i] = true;
            }
        }
        return ans;
    }

    private long[] dijkstra(int n, List<List<int[]>> adj, int src) {
        long[] dist = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[src] = 0;
        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        pq.add(new long[] { 0, src });
        while (!pq.isEmpty()) {
            long[] top = pq.poll();
            long d = top[0];
            int u = (int) top[1];
            // stale entry: dist[u] was improved after this was pushed
            if (d != dist[u]) {
                continue;
            }
            for (int[] e : adj.get(u)) {
                int v = e[0],
                    w = e[1];
                long nd = d + w;
                if (nd < dist[v]) {
                    dist[v] = nd;
                    pq.add(new long[] { nd, v });
                }
            }
        }
        return dist;
    }
}
