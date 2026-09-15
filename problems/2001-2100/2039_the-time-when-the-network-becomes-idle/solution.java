import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int networkBecomesIdle(int[][] edges, int[] patience) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < patience.length; ++i) graph.add(new ArrayList<>());
        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }

        int[] distance = new int[patience.length];
        Arrays.fill(distance, -1);
        distance[0] = 0;
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        queue.add(0);
        while (!queue.isEmpty()) {
            int node = queue.remove();
            for (int neighbor : graph.get(node)) {
                if (distance[neighbor] == -1) {
                    distance[neighbor] = distance[node] + 1;
                    queue.add(neighbor);
                }
            }
        }

        long lastArrival = 0;
        for (int server = 1; server < patience.length; ++server) {
            long roundTrip = 2L * distance[server];
            long lastSend = ((roundTrip - 1) / patience[server]) * patience[server];
            lastArrival = Math.max(lastArrival, lastSend + roundTrip);
        }
        return (int) (lastArrival + 1);
    }
}
