import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

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
        Deque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] { 1, 0 });

        while (!queue.isEmpty()) {
            int[] state = queue.poll();
            int nextDistance = state[1] + 1;
            for (int neighbor : graph[state[0]]) {
                if (nextDistance < first[neighbor]) {
                    second[neighbor] = first[neighbor];
                    first[neighbor] = nextDistance;
                    queue.add(new int[] { neighbor, nextDistance });
                } else if (first[neighbor] < nextDistance && nextDistance < second[neighbor]) {
                    second[neighbor] = nextDistance;
                    queue.add(new int[] { neighbor, nextDistance });
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
