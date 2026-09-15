class Solution {

    public long maxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.length;
        long[] dp = new long[n + 1];
        for (int i = 1; i <= n; i++) {
            long best = 0;
            int runningMax = 0;
            int limit = Math.min(k, i);
            for (int j = 1; j <= limit; j++) {
                if (arr[i - j] > runningMax) {
                    runningMax = arr[i - j];
                }
                long candidate = dp[i - j] + (long) runningMax * j;
                if (candidate > best) {
                    best = candidate;
                }
            }
            dp[i] = best;
        }
        return dp[n];
    }
}
