import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        List<int[]>[] graph = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new ArrayList<>();
        }
        for (int[] flight : flights) {
            graph[flight[0]].add(new int[] { flight[1], flight[2] });
        }
        // State = (cost, node, flights taken). Carrying the count in the
        // state is what enforces the limit: a state that already used its
        // k+1 flights is never allowed to board another.
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.offer(new int[] { 0, src, 0 });
        int[] best = new int[n];
        Arrays.fill(best, Integer.MAX_VALUE);
        while (!heap.isEmpty()) {
            int[] cur = heap.poll();
            int cost = cur[0],
                node = cur[1],
                edges = cur[2];
            // The heap pops in cost order, so the first dst pop is final.
            if (node == dst) {
                return cost;
            }
            // Dominance prune: a cheaper state that used no more flights was
            // already expanded here, so this one cannot lead anywhere new.
            if (edges > best[node]) {
                continue;
            }
            best[node] = edges;
            if (edges < k + 1) {
                for (int[] flight : graph[node]) {
                    heap.offer(new int[] { cost + flight[1], flight[0], edges + 1 });
                }
            }
        }
        return -1;
    }
}
