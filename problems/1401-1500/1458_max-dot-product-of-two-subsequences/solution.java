class Solution {

    public int maxDotProduct(int[] nums1, int[] nums2) {
        int n = nums1.length;
        int m = nums2.length;
        int[][] dp = new int[n + 1][m + 1];
        for (int i = 0; i <= n; i++) {
            dp[i][m] = Integer.MIN_VALUE;
        }
        for (int j = 0; j <= m; j++) {
            dp[n][j] = Integer.MIN_VALUE;
        }
        for (int i = n - 1; i >= 0; i--) {
            for (int j = m - 1; j >= 0; j--) {
                int pair = nums1[i] * nums2[j];
                int tail = dp[i + 1][j + 1];
                long withPair = (long) pair + Math.max(tail, 0);
                long best = Math.max(withPair, Math.max(dp[i + 1][j], dp[i][j + 1]));
                dp[i][j] = (int) best;
            }
        }
        return dp[0][0];
    }
}
