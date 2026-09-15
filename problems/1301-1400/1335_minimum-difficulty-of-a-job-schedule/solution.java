class Solution {

    public int minDifficulty(int[] jobDifficulty, int d) {
        int n = jobDifficulty.length;
        if (n < d) {
            return -1;
        }
        final int INF = Integer.MAX_VALUE / 2;
        int[][] dp = new int[d + 1][n + 1];
        for (int[] row : dp) {
            java.util.Arrays.fill(row, INF);
        }
        dp[0][0] = 0;
        for (int j = 1; j <= d; j++) {
            for (int i = j; i <= n; i++) {
                int dayMax = 0;
                int best = INF;
                for (int k = i; k >= j; k--) {
                    dayMax = Math.max(dayMax, jobDifficulty[k - 1]);
                    int prev = dp[j - 1][k - 1];
                    if (prev != INF && prev + dayMax < best) {
                        best = prev + dayMax;
                    }
                }
                dp[j][i] = best;
            }
        }
        return dp[d][n];
    }
}
