class Solution {

    public int assignBikes(int[][] workers, int[][] bikes) {
        int n = workers.length;
        int m = bikes.length;
        int[][] dist = new int[n][m];
        for (int i = 0; i < n; i++) {
            for (int b = 0; b < m; b++) {
                dist[i][b] = Math.abs(workers[i][0] - bikes[b][0]) + Math.abs(workers[i][1] - bikes[b][1]);
            }
        }
        int size = 1 << m;
        int INF = Integer.MAX_VALUE;
        int[] dp = new int[size];
        dp[0] = 0;
        java.util.Arrays.fill(dp, 1, size, INF);
        int best = INF;
        for (int mask = 0; mask < size; mask++) {
            if (dp[mask] == INF) {
                continue;
            }
            int assigned = Integer.bitCount(mask);
            if (assigned == n) {
                if (dp[mask] < best) {
                    best = dp[mask];
                }
                continue;
            }
            for (int b = 0; b < m; b++) {
                if ((mask & (1 << b)) == 0) {
                    int candidate = dp[mask] + dist[assigned][b];
                    int next = mask | (1 << b);
                    if (candidate < dp[next]) {
                        dp[next] = candidate;
                    }
                }
            }
        }
        return best;
    }
}
