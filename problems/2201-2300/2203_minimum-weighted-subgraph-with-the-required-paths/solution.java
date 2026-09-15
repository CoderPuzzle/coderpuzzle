import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public long minimumWeight(int n, int[][] edges, int src1, int src2, int dest) {
        List<long[]>[] adj = new ArrayList[n];
        List<long[]>[] radj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
            radj[i] = new ArrayList<>();
        }
        for (int[] e : edges) {
            adj[e[0]].add(new long[] { e[1], e[2] });
            // reverse adjacency: a search from dest on radj yields dist(v, dest)
            radj[e[1]].add(new long[] { e[0], e[2] });
        }
        // optimal paths from src1 and src2 meet at some node v and share v->dest
        long[] d1 = dijkstra(n, adj, src1);
        long[] d2 = dijkstra(n, adj, src2);
        long[] dd = dijkstra(n, radj, dest);
        // the shared v->dest segment counts once: independent distances, added
        long best = Long.MAX_VALUE;
        for (int v = 0; v < n; v++) {
            // skip any v on a missing leg; none can lie on a valid subgraph
            if (dd[v] != Long.MAX_VALUE && d1[v] != Long.MAX_VALUE && d2[v] != Long.MAX_VALUE) {
                long total = d1[v] + d2[v] + dd[v];
                if (total < best) best = total;
            }
        }
        return best == Long.MAX_VALUE ? -1 : best;
    }

    private long[] dijkstra(int n, List<long[]>[] adj, int src) {
        long[] dist = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[src] = 0;
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        heap.offer(new long[] { 0, src });
        while (!heap.isEmpty()) {
            long[] top = heap.poll();
            long d = top[0];
            int u = (int) top[1];
            if (d > dist[u]) continue; // lazy deletion: stale heap entry
            for (long[] e : adj[u]) {
                int v = (int) e[0];
                long nd = d + e[1];
                if (nd < dist[v]) {
                    dist[v] = nd;
                    heap.offer(new long[] { nd, v });
                }
            }
        }
        return dist;
    }
}
