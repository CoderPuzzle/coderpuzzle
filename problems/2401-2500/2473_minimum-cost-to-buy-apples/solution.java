import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] minCost(int n, int[][] roads, int[] appleCost, int k) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] r : roads) {
            adj.get(r[0]).add(new int[] { r[1], r[2] });
            adj.get(r[1]).add(new int[] { r[0], r[2] });
        }

        int[] answer = new int[n];
        // A trip is: reach j, buy, retrace. Any cheaper return path would
        // also be a cheaper outbound path, so the total is
        // appleCost[j] + (k+1)*d(j) with d = shortest distance from start.
        for (int start = 1; start <= n; start++) {
            // Dijkstra needs the strictly positive road weights; a popped
            // entry older than dist[u] is stale (lazy deletion).
            int[] dist = new int[n + 1];
            java.util.Arrays.fill(dist, Integer.MAX_VALUE);
            dist[start] = 0;
            // Monotone bucket queue would do, but a plain binary heap is fine.
            java.util.PriorityQueue<long[]> heap = new java.util.PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
            heap.add(new long[] { 0, start });
            while (!heap.isEmpty()) {
                long[] top = heap.poll();
                long d = top[0];
                int u = (int) top[1];
                if (d > dist[u]) continue;
                for (int[] e : adj.get(u)) {
                    long nd = d + e[1];
                    if (nd < dist[e[0]]) {
                        dist[e[0]] = (int) nd;
                        heap.add(new long[] { nd, e[0] });
                    }
                }
            }
            // j = start contributes d = 0, so buying locally is always a
            // candidate.
            int best = Integer.MAX_VALUE;
            for (int j = 1; j <= n; j++) {
                int total = appleCost[j - 1] + (k + 1) * dist[j];
                if (total < best) best = total;
            }
            answer[start - 1] = best;
        }
        return answer;
    }
}
