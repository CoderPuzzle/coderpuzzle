import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int shortestPathWithHops(int n, int[][] edges, int s, int d, int k) {
        List<List<int[]>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; ++i) adjacency.add(new ArrayList<>());
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(new int[] { edge[1], edge[2] });
            adjacency.get(edge[1]).add(new int[] { edge[0], edge[2] });
        }

        int[][] best = new int[n][k + 1];
        for (int[] row : best) Arrays.fill(row, Integer.MAX_VALUE);
        best[s][0] = 0;
        // Min-heap ordered by distance, smallest first; entries are
        // {distance, node, hops used}.
        PriorityQueue<int[]> heap = new PriorityQueue<>((x, y) -> Integer.compare(x[0], y[0]));
        heap.offer(new int[] { 0, s, 0 });
        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int dist = top[0];
            int node = top[1];
            int hops = top[2];
            if (dist > best[node][hops]) continue;
            if (node == d) return dist;
            for (int[] edge : adjacency.get(node)) {
                int candidate = dist + edge[1];
                int neighbor = edge[0];
                if (candidate < best[neighbor][hops]) {
                    best[neighbor][hops] = candidate;
                    heap.offer(new int[] { candidate, neighbor, hops });
                }
                if (hops < k && dist < best[neighbor][hops + 1]) {
                    best[neighbor][hops + 1] = dist;
                    heap.offer(new int[] { dist, neighbor, hops + 1 });
                }
            }
        }
        throw new AssertionError("unreachable: the graph is connected");
    }
}
