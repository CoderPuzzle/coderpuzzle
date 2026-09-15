import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int[] minimumTime(int n, int[][] edges, int[] disappear) {
        // Dijkstra from node 0 with one extra rule: arriving at or after a
        // node's disappearance instant means it was never visited, so such a
        // settlement propagates nothing onward either. Every settled distance
        // is < 10^5 and every pushed candidate < 2 * 10^5, so ints carry all.
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; ++i) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[] { e[1], e[2] });
            adj.get(e[1]).add(new int[] { e[0], e[2] });
        }
        final int BIG = 1 << 29;
        int[] dist = new int[n];
        Arrays.fill(dist, BIG);
        // Min-heap of [distance, node]
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) ->
            a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1])
        );
        dist[0] = 0;
        heap.offer(new int[] { 0, 0 });
        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int d = top[0],
                u = top[1];
            if (d != dist[u]) continue; // stale entry
            if (d >= disappear[u]) continue; // gone on arrival; cannot be visited
            for (int[] next : adj.get(u)) {
                int v = next[0],
                    w = next[1];
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    heap.offer(new int[] { d + w, v });
                }
            }
        }
        int[] answer = new int[n];
        for (int i = 0; i < n; ++i) answer[i] = dist[i] < disappear[i] ? dist[i] : -1;
        return answer;
    }
}
