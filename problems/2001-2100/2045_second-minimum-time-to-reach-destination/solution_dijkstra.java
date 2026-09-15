import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public int secondMinimum(int n, int[][] edges, int time, int change) {
        List<Integer>[] graph = new ArrayList[n + 1];
        for (int vertex = 1; vertex <= n; vertex++) {
            graph[vertex] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            graph[edge[0]].add(edge[1]);
            graph[edge[1]].add(edge[0]);
        }

        int[] first = new int[n + 1];
        int[] second = new int[n + 1];
        Arrays.fill(first, Integer.MAX_VALUE);
        Arrays.fill(second, Integer.MAX_VALUE);
        first[1] = 0;
        PriorityQueue<int[]> pending = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        pending.add(new int[] { 0, 1 });

        while (!pending.isEmpty()) {
            int[] state = pending.poll();
            int vertex = state[1];
            // stale entry: both slots improved after this was pushed
            if (state[0] > second[vertex]) {
                continue;
            }
            int nextDistance = state[0] + 1;
            for (int neighbor : graph[vertex]) {
                if (nextDistance < first[neighbor]) {
                    second[neighbor] = first[neighbor];
                    first[neighbor] = nextDistance;
                    pending.add(new int[] { nextDistance, neighbor });
                } else if (first[neighbor] < nextDistance && nextDistance < second[neighbor]) {
                    second[neighbor] = nextDistance;
                    pending.add(new int[] { nextDistance, neighbor });
                }
            }
        }

        long elapsed = 0;
        for (int step = 0; step < second[n]; step++) {
            if ((elapsed / change) % 2 == 1) {
                elapsed = (elapsed / change + 1) * change;
            }
            elapsed += time;
        }
        return (int) elapsed;
    }
}
