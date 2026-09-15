class Solution {

    public int minFallingPathSum(int[][] matrix) {
        // Sweep the rows top to bottom carrying one row of answers: dp[j]
        // is the smallest sum of a falling path ending at the current
        // row's column j, built from the three reachable parents above.
        int n = matrix[0].length;
        int[] dp = matrix[0].clone();
        for (int r = 1; r < matrix.length; ++r) {
            int[] prev = dp;
            dp = new int[n];
            for (int j = 0; j < n; ++j) {
                int best = prev[j];
                if (j > 0 && prev[j - 1] < best) {
                    best = prev[j - 1];
                }
                if (j + 1 < n && prev[j + 1] < best) {
                    best = prev[j + 1];
                }
                dp[j] = matrix[r][j] + best;
            }
        }
        int ans = dp[0];
        for (int j = 1; j < n; ++j) {
            ans = Math.min(ans, dp[j]);
        }
        return ans;
    }
}
