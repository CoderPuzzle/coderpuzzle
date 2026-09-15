import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int countPaths(int n, int[][] roads) {
        final long MOD = 1000000007L;
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] r : roads) {
            adj[r[0]].add(new int[] { r[1], r[2] });
            adj[r[1]].add(new int[] { r[0], r[2] });
        }
        long[] dist = new long[n];
        long[] ways = new long[n];
        java.util.Arrays.fill(dist, Long.MAX_VALUE);
        dist[0] = 0;
        ways[0] = 1; // exactly one way to be at the source: the empty path
        // min-heap of (dist, node)
        PriorityQueue<long[]> heap = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return Long.compare(a[0], b[0]);
            return Long.compare(a[1], b[1]);
        });
        heap.offer(new long[] { 0, 0 });
        while (!heap.isEmpty()) {
            long[] top = heap.poll();
            long d = top[0];
            int u = (int) top[1];
            // Positive weights => u is finalized only after every shortest path
            // into it was relaxed, so ways[u] is complete at pop time;
            // d > dist[u] just discards a stale heap entry.
            if (d > dist[u]) continue;
            for (int[] e : adj[u]) {
                int v = e[0];
                long nd = d + e[1];
                if (nd < dist[v]) {
                    // Strictly shorter route: old path counts are obsolete, reset.
                    dist[v] = nd;
                    ways[v] = ways[u];
                    heap.offer(new long[] { nd, v });
                } else if (nd == dist[v]) {
                    // Equally short route: extend the count, not the distance.
                    ways[v] = (ways[v] + ways[u]) % MOD;
                }
            }
        }
        return (int) (ways[n - 1] % MOD);
    }
}
