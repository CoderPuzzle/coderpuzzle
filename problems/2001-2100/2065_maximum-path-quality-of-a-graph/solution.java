class Solution {

    private int[] values;
    private int maxTime;
    private java.util.List<int[]>[] graph;
    private int[] visits;
    private int best;

    public int maximalPathQuality(int[] values, int[][] edges, int maxTime) {
        this.values = values;
        this.maxTime = maxTime;
        graph = new java.util.ArrayList[values.length];
        for (int node = 0; node < values.length; node++) {
            graph[node] = new java.util.ArrayList<>();
        }
        for (int[] edge : edges) {
            graph[edge[0]].add(new int[] { edge[1], edge[2] });
            graph[edge[1]].add(new int[] { edge[0], edge[2] });
        }

        visits = new int[values.length];
        visits[0] = 1;
        best = values[0];
        search(0, 0, values[0]);
        return best;
    }

    private void search(int node, int elapsed, int quality) {
        if (node == 0) {
            best = Math.max(best, quality);
        }

        for (int[] next : graph[node]) {
            int neighbor = next[0];
            int nextTime = elapsed + next[1];
            if (nextTime > maxTime) {
                continue;
            }
            boolean firstVisit = visits[neighbor] == 0;
            visits[neighbor]++;
            search(neighbor, nextTime, quality + (firstVisit ? values[neighbor] : 0));
            visits[neighbor]--;
        }
    }
}
