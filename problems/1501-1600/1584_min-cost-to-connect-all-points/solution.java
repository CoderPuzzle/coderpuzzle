class Solution {

    public long minCostConnectPoints(int[][] points) {
        int n = points.length;
        if (n <= 1) {
            return 0;
        }
        long inf = Long.MAX_VALUE;
        // best[v]: cheapest Manhattan distance from any tree vertex to the
        // outside vertex v; best[0] = 0 makes the seed point free.
        long[] best = new long[n];
        best[0] = 0;
        for (int i = 1; i < n; i++) {
            best[i] = inf;
        }
        boolean[] used = new boolean[n];
        long total = 0;
        for (int step = 0; step < n; step++) {
            // Cheapest edge leaving the current tree — safe to add by
            // Prim's cut property.
            int u = -1;
            for (int v = 0; v < n; v++) {
                if (!used[v] && (u == -1 || best[v] < best[u])) {
                    u = v;
                }
            }
            total += best[u];
            used[u] = true;
            // Relax every outside vertex against the newly attached u.
            for (int v = 0; v < n; v++) {
                if (!used[v]) {
                    long d =
                        Math.abs((long) points[u][0] - points[v][0]) + Math.abs((long) points[u][1] - points[v][1]);
                    if (d < best[v]) {
                        best[v] = d;
                    }
                }
            }
        }
        return total;
    }
}
