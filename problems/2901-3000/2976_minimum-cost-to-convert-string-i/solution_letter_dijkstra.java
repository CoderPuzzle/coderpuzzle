import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public long minimumCost(String source, String target, String[] original, String[] changed, int[] cost) {
        // A conversion rule is a directed edge in the 26-letter cost graph;
        // the cheapest a->b conversion is the shortest path a->b.
        List<int[]>[] adj = new ArrayList[26];
        for (int i = 0; i < 26; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int e = 0; e < original.length; e++) {
            int a = original[e].charAt(0) - 'a';
            int b = changed[e].charAt(0) - 'a';
            // Duplicate rules for the same pair need no care: the relaxation test keeps the cheaper copy.
            adj[a].add(new int[] { b, cost[e] });
        }
        final long INF = Long.MAX_VALUE / 4;
        long[][] dist = new long[26][26];
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        for (int src = 0; src < 26; src++) {
            // Dijkstra from src: with positive costs the smallest tentative pop
            // is already final, so every letter settles exactly once.
            long[] row = dist[src];
            Arrays.fill(row, INF);
            row[src] = 0;
            heap.offer(new long[] { 0, src });
            while (!heap.isEmpty()) {
                long[] cur = heap.poll();
                long d = cur[0];
                int u = (int) cur[1];
                // Stale-entry guard: skip outdated heap records.
                if (d > row[u]) {
                    continue;
                }
                for (int[] e : adj[u]) {
                    long nd = d + e[1];
                    // Relax only when the route strictly improves.
                    if (nd < row[e[0]]) {
                        row[e[0]] = nd;
                        heap.offer(new long[] { nd, e[0] });
                    }
                }
            }
        }
        // Matching characters convert for free; one unreachable pair fails all.
        long total = 0;
        int len = source.length();
        for (int p = 0; p < len; p++) {
            int s = source.charAt(p) - 'a';
            int t = target.charAt(p) - 'a';
            if (s == t) continue;
            long d = dist[s][t];
            if (d == INF) return -1;
            total += d;
        }
        return total;
    }
}
