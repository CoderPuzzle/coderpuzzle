import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int findTheCity(int n, int[][] edges, int distanceThreshold) {
        // Mirror each undirected edge both ways, so every node can run its own
        // Dijkstra over the adjacency list and pay only for real edges.
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] e : edges) {
            adj[e[0]].add(new int[] { e[1], e[2] });
            adj[e[1]].add(new int[] { e[0], e[2] });
        }
        final int INF = Integer.MAX_VALUE / 2;
        int[] counts = new int[n];
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        for (int src = 0; src < n; src++) {
            // Dijkstra from src: with positive weights the smallest tentative pop
            // is already final, so every node settles exactly once.
            int[] dist = new int[n];
            Arrays.fill(dist, INF);
            dist[src] = 0;
            heap.offer(new int[] { 0, src });
            while (!heap.isEmpty()) {
                int[] cur = heap.poll();
                int d = cur[0];
                int u = cur[1];
                // Stale-entry guard: skip outdated heap records.
                if (d > dist[u]) {
                    continue;
                }
                for (int[] e : adj[u]) {
                    int nd = d + e[1];
                    // Relax only when the route strictly improves.
                    if (nd < dist[e[0]]) {
                        dist[e[0]] = nd;
                        heap.offer(new int[] { nd, e[0] });
                    }
                }
            }
            int count = 0;
            for (int v = 0; v < n; v++) {
                if (v != src && dist[v] <= distanceThreshold) {
                    count++;
                }
            }
            counts[src] = count;
        }
        // Ascending scan with a strictly-smaller count (or equal count at a
        // larger index) implements the tie-break: greatest city number wins.
        int bestCity = -1;
        int bestCount = INF;
        for (int i = 0; i < n; i++) {
            int count = counts[i];
            if (count < bestCount || (count == bestCount && i > bestCity)) {
                bestCity = i;
                bestCount = count;
            }
        }
        return bestCity;
    }
}
