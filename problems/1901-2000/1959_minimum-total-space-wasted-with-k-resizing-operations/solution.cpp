class Solution {
  public:
    int minSpaceWastedKResizing(vector<int> &nums, int k) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
        // g[i][j] = waste if a single allocation covers nums[i..j]
        vector<vector<long long>> g(n, vector<long long>(n, 0));
        for (int i = 0; i < n; i++) {
            long long mx = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] > mx)
                    mx = nums[j];
                g[i][j] = mx * (j - i + 1) - (prefix[j + 1] - prefix[i]);
            }
        }
        const long long INF = LLONG_MAX / 4;
        // dp[j][i] = min waste for suffix starting at i using j segments
        vector<vector<long long>> dp(k + 2, vector<long long>(n + 1, INF));
        dp[0][n] = 0;
        for (int j = 1; j < k + 2; j++) {
            for (int i = n - 1; i >= 0; i--) {
                long long best = INF;
                for (int t = i; t < n; t++) {
                    if (dp[j - 1][t + 1] < INF) {
                        long long cand = g[i][t] + dp[j - 1][t + 1];
                        if (cand < best)
                            best = cand;
                    }
                }
                dp[j][i] = best;
            }
        }
        return (int)dp[k + 1][0];
    }
};
