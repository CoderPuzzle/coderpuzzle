import java.util.Arrays;

class Solution {

    private static final int INF = Integer.MAX_VALUE / 2;

    public int minCost(int[] houses, int[][] cost, int m, int n, int target) {
        int[][] dp = new int[n + 1][target + 1];
        for (int[] row : dp) {
            Arrays.fill(row, INF);
        }
        if (houses[0] != 0) {
            dp[houses[0]][1] = 0;
        } else {
            for (int j = 1; j <= n; j++) {
                dp[j][1] = cost[0][j - 1];
            }
        }
        for (int i = 1; i < m; i++) {
            int[][] ndp = new int[n + 1][target + 1];
            for (int[] row : ndp) {
                Arrays.fill(row, INF);
            }
            for (int j = 1; j <= n; j++) {
                if (houses[i] != 0 && houses[i] != j) {
                    continue;
                }
                int cj = houses[i] != 0 ? 0 : cost[i][j - 1];
                for (int pj = 1; pj <= n; pj++) {
                    for (int k = 1; k <= target; k++) {
                        if (dp[pj][k] >= INF) {
                            continue;
                        }
                        int nk = pj == j ? k : k + 1;
                        if (nk <= target && dp[pj][k] + cj < ndp[j][nk]) {
                            ndp[j][nk] = dp[pj][k] + cj;
                        }
                    }
                }
            }
            dp = ndp;
        }
        int best = INF;
        for (int j = 1; j <= n; j++) {
            best = Math.min(best, dp[j][target]);
        }
        return best >= INF ? -1 : best;
    }
}
