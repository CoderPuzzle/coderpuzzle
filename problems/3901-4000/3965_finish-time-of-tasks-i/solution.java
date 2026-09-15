class Solution {

    public long finishTime(int n, int[][] edges, int[] baseTime) {
        java.util.List<Integer>[] children = new java.util.ArrayList[n];
        for (int i = 0; i < n; i++) children[i] = new java.util.ArrayList<>();
        for (int[] edge : edges) children[edge[0]].add(edge[1]);

        long[] finish = new long[n];
        for (int node = n - 1; node >= 0; node--) {
            if (children[node].isEmpty()) {
                finish[node] = baseTime[node];
                continue;
            }
            long earliest = Long.MAX_VALUE;
            long latest = Long.MIN_VALUE;
            for (int child : children[node]) {
                earliest = Math.min(earliest, finish[child]);
                latest = Math.max(latest, finish[child]);
            }
            long ownDuration = latest - earliest + baseTime[node];
            finish[node] = latest + ownDuration;
        }
        return finish[0];
    }
}
