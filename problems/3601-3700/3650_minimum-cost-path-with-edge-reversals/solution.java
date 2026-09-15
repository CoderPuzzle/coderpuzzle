import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int minCost(int n, int[][] edges) {
        // Every edge (u, v, w) also contributes the single-move reversal
        // v -> u at 2 * w: standing at v, flip v's unused switch on the
        // incoming edge u -> v. Weights are positive, so an optimal trip is
        // a simple path and flips at most one switch per node anyway.
        List<int[]>[] graph = new ArrayList[n];
        for (int node = 0; node < n; node++) {
            graph[node] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            graph[edge[0]].add(new int[] { edge[1], edge[2] });
            graph[edge[1]].add(new int[] { edge[0], 2 * edge[2] });
        }

        // Dijkstra from node 0; weights are positive, so each pop finalizes.
        long[] distances = new long[n];
        Arrays.fill(distances, Long.MAX_VALUE);
        distances[0] = 0;
        PriorityQueue<long[]> heap = new PriorityQueue<>((left, right) -> Long.compare(left[0], right[0]));
        heap.offer(new long[] { 0, 0 });
        while (!heap.isEmpty()) {
            long[] top = heap.poll();
            long distance = top[0];
            int node = (int) top[1];
            if (distance != distances[node]) {
                continue; // stale entry; the node was finalized earlier
            }
            for (int[] next : graph[node]) {
                long candidate = distance + next[1];
                if (candidate < distances[next[0]]) {
                    distances[next[0]] = candidate;
                    heap.offer(new long[] { candidate, next[0] });
                }
            }
        }

        // An unreached target keeps the MAX_VALUE sentinel.
        long best = distances[n - 1];
        return best == Long.MAX_VALUE ? -1 : (int) best;
    }
}
