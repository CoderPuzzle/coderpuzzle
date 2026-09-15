class Solution {

    public long[] minCost(int n, int[] prices, int[][] roads) {
        java.util.List<long[]>[] graph = new java.util.ArrayList[n];
        for (int i = 0; i < n; i++) graph[i] = new java.util.ArrayList<>();
        for (int[] road : roads) {
            long loaded = (long) road[2] * road[3];
            graph[road[0]].add(new long[] { road[1], road[2], loaded });
            graph[road[1]].add(new long[] { road[0], road[2], loaded });
        }
        long[] answer = new long[n];
        for (int start = 0; start < n; start++) {
            long[] emptyDistance = dijkstra(graph, start, false);
            long[] loadedDistance = dijkstra(graph, start, true);
            answer[start] = Long.MAX_VALUE;
            for (int shop = 0; shop < n; shop++) {
                if (emptyDistance[shop] == Long.MAX_VALUE) continue;
                answer[start] = Math.min(answer[start], prices[shop] + emptyDistance[shop] + loadedDistance[shop]);
            }
        }
        return answer;
    }

    private long[] dijkstra(java.util.List<long[]>[] graph, int start, boolean loaded) {
        long[] distance = new long[graph.length];
        java.util.Arrays.fill(distance, Long.MAX_VALUE);
        distance[start] = 0;
        java.util.PriorityQueue<long[]> heap = new java.util.PriorityQueue<>(
            java.util.Comparator.comparingLong(a -> a[0])
        );
        heap.add(new long[] { 0, start });
        while (!heap.isEmpty()) {
            long[] item = heap.remove();
            long current = item[0];
            int node = (int) item[1];
            if (current != distance[node]) continue;
            for (long[] edge : graph[node]) {
                int neighbor = (int) edge[0];
                long candidate = current + edge[loaded ? 2 : 1];
                if (candidate < distance[neighbor]) {
                    distance[neighbor] = candidate;
                    heap.add(new long[] { candidate, neighbor });
                }
            }
        }
        return distance;
    }
}
