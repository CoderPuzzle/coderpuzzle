class Solution {

    public int minimumThreshold(int n, int[][] edges, int source, int target, int k) {
        if (source == target) return 0;
        java.util.List<int[]>[] graph = new java.util.ArrayList[n];
        for (int i = 0; i < n; i++) graph[i] = new java.util.ArrayList<>();
        int high = 0;
        for (int[] edge : edges) {
            graph[edge[0]].add(new int[] { edge[1], edge[2] });
            graph[edge[1]].add(new int[] { edge[0], edge[2] });
            high = Math.max(high, edge[2]);
        }
        if (!feasible(graph, source, target, k, high)) return -1;
        int low = 0;
        while (low < high) {
            int middle = low + (high - low) / 2;
            if (feasible(graph, source, target, k, middle)) high = middle;
            else low = middle + 1;
        }
        return low;
    }

    private boolean feasible(java.util.List<int[]>[] graph, int source, int target, int k, int threshold) {
        int[] distance = new int[graph.length];
        java.util.Arrays.fill(distance, k + 1);
        distance[source] = 0;
        java.util.ArrayDeque<Integer> queue = new java.util.ArrayDeque<>();
        queue.add(source);
        while (!queue.isEmpty()) {
            int node = queue.removeFirst();
            for (int[] edge : graph[node]) {
                int cost = edge[1] > threshold ? 1 : 0;
                int candidate = distance[node] + cost;
                if (candidate < distance[edge[0]] && candidate <= k) {
                    distance[edge[0]] = candidate;
                    if (cost == 0) queue.addFirst(edge[0]);
                    else queue.addLast(edge[0]);
                }
            }
        }
        return distance[target] <= k;
    }
}
