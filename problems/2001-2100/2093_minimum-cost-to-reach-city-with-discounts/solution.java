import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int minimumCost(int n, int[][] highways, int discounts) {
        List<int[]>[] graph = new ArrayList[n];
        for (int city = 0; city < n; city++) {
            graph[city] = new ArrayList<>();
        }
        for (int[] highway : highways) {
            graph[highway[0]].add(new int[] { highway[1], highway[2] });
            graph[highway[1]].add(new int[] { highway[0], highway[2] });
        }

        long[][] distances = new long[n][discounts + 1];
        for (long[] row : distances) {
            Arrays.fill(row, Long.MAX_VALUE);
        }
        distances[0][0] = 0;
        PriorityQueue<long[]> heap = new PriorityQueue<>((left, right) -> Long.compare(left[0], right[0]));
        heap.offer(new long[] { 0, 0, 0 });
        while (!heap.isEmpty()) {
            long[] state = heap.poll();
            long cost = state[0];
            int city = (int) state[1];
            int used = (int) state[2];
            if (cost != distances[city][used]) {
                continue;
            }
            if (city == n - 1) {
                return (int) cost;
            }
            for (int[] edge : graph[city]) {
                int neighbor = edge[0];
                int toll = edge[1];
                long fullCost = cost + toll;
                if (fullCost < distances[neighbor][used]) {
                    distances[neighbor][used] = fullCost;
                    heap.offer(new long[] { fullCost, neighbor, used });
                }
                if (used < discounts) {
                    long discountedCost = cost + toll / 2;
                    if (discountedCost < distances[neighbor][used + 1]) {
                        distances[neighbor][used + 1] = discountedCost;
                        heap.offer(new long[] { discountedCost, neighbor, used + 1 });
                    }
                }
            }
        }
        return -1;
    }
}
