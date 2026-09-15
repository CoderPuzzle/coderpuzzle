class Solution {
  public:
    long long maxSumAfterPartitioning(vector<int> &arr, int k) {
        int n = arr.size();
        vector<long long> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            long long best = 0;
            int runningMax = 0;
            int limit = min(k, i);
            for (int j = 1; j <= limit; j++) {
                if (arr[i - j] > runningMax) {
                    runningMax = arr[i - j];
                }
                long long candidate = dp[i - j] + (long long)runningMax * j;
                if (candidate > best) {
                    best = candidate;
                }
            }
            dp[i] = best;
        }
        return dp[n];
    }
};
