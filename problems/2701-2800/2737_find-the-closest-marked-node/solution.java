import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public long minimumDistance(int n, int[][] edges, int s, int[] marked) {
        // Adjacency lists over DIRECTED edges: u -> v only, never the reverse.
        // Parallel edges both enter the list; relaxation keeps the cheaper one.
        List<int[]>[] graph = new ArrayList[n];
        for (int node = 0; node < n; node++) {
            graph[node] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            graph[edge[0]].add(new int[] { edge[1], edge[2] });
        }

        // Dijkstra from s; weights are positive, so each pop finalizes its node.
        long[] distances = new long[n];
        Arrays.fill(distances, Long.MAX_VALUE);
        distances[s] = 0;
        PriorityQueue<long[]> heap = new PriorityQueue<>((left, right) -> Long.compare(left[0], right[0]));
        heap.offer(new long[] { 0, s });
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

        // The answer is the closest marked node; unreachable ones stay at MAX_VALUE.
        long best = Long.MAX_VALUE;
        for (int node : marked) {
            best = Math.min(best, distances[node]);
        }
        return best == Long.MAX_VALUE ? -1 : best;
    }
}
