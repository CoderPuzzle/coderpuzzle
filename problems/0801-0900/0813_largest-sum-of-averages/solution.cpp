class Solution {
  public:
    double largestSumOfAverages(vector<int> &nums, int k) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        // dp[i] = best(i, groups) for the current group count.
        // groups == 1: the whole remaining suffix is one group.
        vector<double> dp(n);
        for (int i = 0; i < n; i++) {
            dp[i] = (double)(prefix[n] - prefix[i]) / (n - i);
        }

        for (int groups = 2; groups <= k; groups++) {
            vector<double> ndp(n, 0.0);
            for (int i = 0; i <= n - groups; i++) {
                double result = 0.0;
                for (int j = i + 1; j <= n - groups + 1; j++) {
                    result = max(result, (double)(prefix[j] - prefix[i]) / (j - i) + dp[j]);
                }
                ndp[i] = result;
            }
            dp = ndp;
        }

        return dp[0];
    }
};
