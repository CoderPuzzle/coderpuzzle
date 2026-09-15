class Solution {

    public double largestSumOfAverages(int[] nums, int k) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        // dp[i] = best(i, groups) for the current group count.
        // groups == 1: the whole remaining suffix is one group.
        double[] dp = new double[n];
        for (int i = 0; i < n; i++) {
            dp[i] = (double) (prefix[n] - prefix[i]) / (n - i);
        }

        for (int groups = 2; groups <= k; groups++) {
            double[] ndp = new double[n];
            for (int i = 0; i <= n - groups; i++) {
                double result = 0.0;
                for (int j = i + 1; j <= n - groups + 1; j++) {
                    result = Math.max(result, (double) (prefix[j] - prefix[i]) / (j - i) + dp[j]);
                }
                ndp[i] = result;
            }
            dp = ndp;
        }

        return dp[0];
    }
}
