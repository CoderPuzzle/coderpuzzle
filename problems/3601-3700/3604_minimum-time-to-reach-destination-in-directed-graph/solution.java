import java.util.*;

class Solution {

    public int minTime(int n, int[][] edges) {
        // Earliest-arrival Dijkstra: dist[u] is the soonest time you can be
        // standing on u. Waiting is always allowed, so an edge leaving u at
        // time t departs at max(t, start) — never later, because a later
        // departure only arrives later — provided that moment still lies
        // inside the edge's window. Times are held as long for headroom.
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) {
            adj[e[0]].add(new int[] { e[1], e[2], e[3] });
        }
        long[] dist = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE);
        dist[0] = 0;
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        heap.add(new long[] { 0, 0 });
        while (!heap.isEmpty()) {
            long[] top = heap.poll();
            long t = top[0];
            int u = (int) top[1];
            if (t > dist[u]) continue;
            for (int[] e : adj[u]) {
                long depart = Math.max(t, e[1]);
                if (depart <= e[2]) {
                    long arrive = depart + 1;
                    if (arrive < dist[e[0]]) {
                        dist[e[0]] = arrive;
                        heap.add(new long[] { arrive, e[0] });
                    }
                }
            }
        }
        return dist[n - 1] == Long.MAX_VALUE ? -1 : (int) dist[n - 1];
    }
}
