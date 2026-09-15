import java.util.*;

class Solution {

    public int countRestrictedPaths(int n, int[][] edges) {
        // Dijkstra from node n fixes dist[x] = distanceToLastNode(x).
        // A restricted path strictly decreases that distance at every
        // step, so visiting nodes in increasing distance order makes
        // every count final: each strictly-closer neighbor of u was
        // visited before u. Distances reach ~2*10^9 (n-1 edges of
        // weight 10^5), so they are held in 64-bit integers.
        final long MOD = 1000000007;
        List<int[]>[] adj = new ArrayList[n + 1];
        for (int i = 1; i <= n; ++i) adj[i] = new ArrayList<>();
        for (int[] e : edges) {
            adj[e[0]].add(new int[] { e[1], e[2] });
            adj[e[1]].add(new int[] { e[0], e[2] });
        }
        long[] dist = new long[n + 1];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[n] = 0;
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        heap.add(new long[] { 0, n });
        while (!heap.isEmpty()) {
            long[] top = heap.poll();
            long d = top[0];
            int u = (int) top[1];
            if (d > dist[u]) continue;
            for (int[] e : adj[u]) {
                long nd = d + e[1];
                if (nd < dist[e[0]]) {
                    dist[e[0]] = nd;
                    heap.add(new long[] { nd, e[0] });
                }
            }
        }
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; ++i) order[i] = i + 1;
        Arrays.sort(order, (a, b) -> Long.compare(dist[a], dist[b]));
        long[] count = new long[n + 1];
        count[n] = 1;
        for (int u : order) {
            if (u == n) continue;
            long total = 0;
            for (int[] e : adj[u]) {
                if (dist[u] > dist[e[0]]) total += count[e[0]];
            }
            count[u] = total % MOD;
        }
        return (int) count[1];
    }
}
