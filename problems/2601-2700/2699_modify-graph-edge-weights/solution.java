import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {

    public List<List<Integer>> modifiedGraphEdges(int n, int[][] edges, int source, int destination, int target) {
        int count = edges.length;
        long[] untouched = new long[count];
        for (int index = 0; index < count; index++) {
            untouched[index] = edges[index][2];
        }
        // Raw weights treat every -1 edge as absent; the working copy holds
        // the current assignment.
        if (dijkstra(edges, untouched, n, source)[destination] < target) {
            return new ArrayList<>();
        }

        long[] weights = new long[count];
        for (int index = 0; index < count; index++) {
            weights[index] = untouched[index] > 0 ? untouched[index] : 1;
        }
        if (dijkstra(edges, weights, n, source)[destination] > target) {
            return new ArrayList<>();
        }

        while (true) {
            long[] distances = dijkstra(edges, weights, n, source);
            long current = distances[destination];
            if (current == target) break;

            long[] reverse = dijkstra(edges, weights, n, destination);
            long deficit = target - current;
            int bestIndex = -1;
            long bestKey = Long.MAX_VALUE;
            for (int index = 0; index < count; index++) {
                if (untouched[index] != -1) continue;
                int u = edges[index][0];
                int v = edges[index][1];
                boolean forward = distances[u] + weights[index] + reverse[v] == current;
                boolean backward = distances[v] + weights[index] + reverse[u] == current;
                if (!forward && !backward) continue;
                long key =
                    forward && backward ? Math.min(distances[u], distances[v]) : forward ? distances[u] : distances[v];
                if (key < bestKey) {
                    bestKey = key;
                    bestIndex = index;
                }
            }
            weights[bestIndex] += deficit;
        }

        List<List<Integer>> answer = new ArrayList<>();
        for (int index = 0; index < count; index++) {
            answer.add(Arrays.asList(edges[index][0], edges[index][1], (int) weights[index]));
        }
        return answer;
    }

    private long[] dijkstra(int[][] edges, long[] weights, int n, int start) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int node = 0; node < n; node++) graph.add(new ArrayList<>());
        for (int index = 0; index < edges.length; index++) {
            if (weights[index] <= 0) continue;
            int a = edges[index][0];
            int b = edges[index][1];
            graph.get(a).add(new int[] { b, index });
            graph.get(b).add(new int[] { a, index });
        }

        long[] distance = new long[n];
        Arrays.fill(distance, Long.MAX_VALUE / 4);
        distance[start] = 0;
        PriorityQueue<long[]> queue = new PriorityQueue<>((left, right) -> Long.compare(left[0], right[0]));
        queue.add(new long[] { 0, start });
        while (!queue.isEmpty()) {
            long[] top = queue.poll();
            long dist = top[0];
            int node = (int) top[1];
            if (dist > distance[node]) continue;
            for (int[] link : graph.get(node)) {
                long candidate = dist + weights[link[1]];
                if (candidate < distance[link[0]]) {
                    distance[link[0]] = candidate;
                    queue.add(new long[] { candidate, link[0] });
                }
            }
        }
        return distance;
    }
}
