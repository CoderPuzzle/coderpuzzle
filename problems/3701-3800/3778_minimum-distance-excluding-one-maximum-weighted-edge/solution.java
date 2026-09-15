import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public long minCostExcludingMax(int n, int[][] edges) {
        // Excluding the first maximum-weight edge of a path equals
        // excluding any one designated edge (both give sum - maxweight),
        // so Dijkstra runs over states (node, excluded): staying in a
        // layer pays the edge weight, crossing layers excludes exactly one
        // edge for free. A path cost can reach (n - 1) * 5 * 10^4 ~ 2.5 *
        // 10^9, past 32 bits, so distances ride in long.
        List<List<long[]>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; ++i) adjacency.add(new ArrayList<>());
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(new long[] { edge[1], edge[2] });
            adjacency.get(edge[1]).add(new long[] { edge[0], edge[2] });
        }

        long[][] best = new long[n][2];
        for (long[] row : best) Arrays.fill(row, Long.MAX_VALUE);
        best[0][0] = 0;
        // Min-heap ordered by distance, smallest first; entries are
        // {distance, node, excluded flag}.
        PriorityQueue<long[]> heap = new PriorityQueue<>((x, y) -> Long.compare(x[0], y[0]));
        heap.offer(new long[] { 0, 0, 0 });
        while (!heap.isEmpty()) {
            long[] top = heap.poll();
            long dist = top[0];
            int node = (int) top[1];
            int used = (int) top[2];
            if (dist > best[node][used]) continue;
            if (node == n - 1 && used == 1) return dist;
            for (long[] edge : adjacency.get(node)) {
                int neighbor = (int) edge[0];
                long candidate = dist + edge[1];
                if (candidate < best[neighbor][used]) {
                    best[neighbor][used] = candidate;
                    heap.offer(new long[] { candidate, neighbor, used });
                }
                if (used == 0 && dist < best[neighbor][1]) {
                    best[neighbor][1] = dist;
                    heap.offer(new long[] { dist, neighbor, 1 });
                }
            }
        }
        throw new AssertionError("unreachable: the graph is connected");
    }
}
