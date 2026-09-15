import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int minCostToSupplyWater(int n, int[] wells, int[][] pipes) {
        // Prim over sites 1..n plus a virtual node 0 (source edges): grow the
        // tree outward from node 0, always settling the cheapest frontier
        // edge; an edge must beat the site's recorded best to be pushed.
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int i = 0; i < n; i++) {
            adj.get(0).add(new int[] { wells[i], i + 1 });
            adj.get(i + 1).add(new int[] { wells[i], 0 });
        }
        for (int[] pipe : pipes) {
            adj.get(pipe[0]).add(new int[] { pipe[2], pipe[1] });
            adj.get(pipe[1]).add(new int[] { pipe[2], pipe[0] });
        }

        int[] best = new int[n + 1];
        java.util.Arrays.fill(best, Integer.MAX_VALUE);
        best[0] = 0;
        boolean[] visited = new boolean[n + 1];
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        heap.offer(new int[] { 0, 0 });
        int total = 0;
        int taken = 0;
        while (!heap.isEmpty()) {
            int[] cur = heap.poll();
            // Stale-entry guard: the site already joined the tree earlier.
            if (visited[cur[1]]) {
                continue;
            }
            visited[cur[1]] = true;
            total += cur[0];
            taken += 1;
            if (taken == n + 1) {
                break;
            }
            for (int[] edge : adj.get(cur[1])) {
                // Relax only when the link strictly improves the site's best.
                if (!visited[edge[1]] && edge[0] < best[edge[1]]) {
                    best[edge[1]] = edge[0];
                    heap.offer(new int[] { edge[0], edge[1] });
                }
            }
        }
        return total;
    }
}
