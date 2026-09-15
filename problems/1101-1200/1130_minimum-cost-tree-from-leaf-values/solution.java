class Solution {

    public int mctFromLeafValues(int[] arr) {
        int n = arr.length;
        // dp[i][j] = min sum of non-leaf nodes for subarray arr[i..j]
        int[][] dp = new int[n][n];
        // maxi[i][j] = max leaf value in arr[i..j]
        int[][] maxi = new int[n][n];
        for (int i = 0; i < n; i++) {
            maxi[i][i] = arr[i];
        }
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                maxi[i][j] = Math.max(maxi[i][j - 1], arr[j]);
            }
        }
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                int best = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = maxi[i][k] * maxi[k + 1][j] + dp[i][k] + dp[k + 1][j];
                    if (cost < best) {
                        best = cost;
                    }
                }
                dp[i][j] = best;
            }
        }
        return dp[0][n - 1];
    }
}
