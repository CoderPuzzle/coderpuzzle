class Solution {

    public double new21Game(int n, int k, int maxPts) {
        if (k == 0 || n >= k - 1 + maxPts) {
            return 1.0;
        }
        // dp[i] = probability of ever holding exactly i points.
        double[] dp = new double[n + 1];
        dp[0] = 1.0;
        double window = 1.0; // sum of dp[max(0, i - maxPts) .. i - 1]
        for (int i = 1; i <= n; i++) {
            dp[i] = window / maxPts;
            if (i < k) {
                window += dp[i];
            }
            if (i - maxPts >= 0) {
                window -= dp[i - maxPts];
            }
        }
        // Compensated (Neumaier) summation, matching the reference's built-in sum().
        double result = 0.0;
        double c = 0.0;
        for (int i = k; i <= n; i++) {
            double x = dp[i];
            double t = result + x;
            if (Math.abs(result) >= Math.abs(x)) {
                c += result - t + x;
            } else {
                c += x - t + result;
            }
            result = t;
        }
        return result + c;
    }
}
