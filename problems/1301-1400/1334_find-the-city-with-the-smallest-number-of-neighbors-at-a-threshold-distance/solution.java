class Solution {

    public int findTheCity(int n, int[][] edges, int distanceThreshold) {
        // With n <= 100, compute all-pairs distances at once: 0 diagonal,
        // symmetric direct weights, INF elsewhere.
        final int INF = Integer.MAX_VALUE / 2;
        int[][] dist = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                dist[i][j] = INF;
            }
            dist[i][i] = 0;
        }
        for (int[] e : edges) {
            dist[e[0]][e[1]] = e[2];
            dist[e[1]][e[0]] = e[2];
        }
        // Floyd-Warshall: relax dist[i][j] through intermediate node k. The
        // INF guards skip pairs that cannot improve anything this pass.
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                int dik = dist[i][k];
                if (dik == INF) {
                    continue;
                }
                for (int j = 0; j < n; j++) {
                    if (dist[k][j] == INF) {
                        continue;
                    }
                    int candidate = dik + dist[k][j];
                    if (candidate < dist[i][j]) {
                        dist[i][j] = candidate;
                    }
                }
            }
        }
        // Ascending scan with a strictly-smaller count (or equal count at a
        // larger index) implements the tie-break: greatest city number wins.
        int bestCity = -1;
        int bestCount = INF;
        for (int i = 0; i < n; i++) {
            int count = 0;
            for (int j = 0; j < n; j++) {
                if (j != i && dist[i][j] <= distanceThreshold) {
                    count++;
                }
            }
            if (count < bestCount || (count == bestCount && i > bestCity)) {
                bestCity = i;
                bestCount = count;
            }
        }
        return bestCity;
    }
}
