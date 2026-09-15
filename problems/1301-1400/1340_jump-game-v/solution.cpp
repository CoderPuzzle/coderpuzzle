class Solution {
  public:
    int maxJumps(vector<int> &arr, int d) {
        // Process indices in increasing height order: every one-jump target
        // is strictly lower, so its dp value is already final when needed.
        int n = (int)arr.size();
        vector<int> order(n);
        for (int i = 0; i < n; ++i) {
            order[i] = i;
        }
        sort(order.begin(), order.end(), [&](int a, int b) { return arr[a] < arr[b]; });
        vector<int> dp(n, 1);
        for (int i : order) {
            for (int j = i + 1; j < n && j - i <= d && arr[j] < arr[i]; ++j) {
                dp[i] = max(dp[i], 1 + dp[j]);
            }
            for (int j = i - 1; j >= 0 && i - j <= d && arr[j] < arr[i]; --j) {
                dp[i] = max(dp[i], 1 + dp[j]);
            }
        }
        return *max_element(dp.begin(), dp.end());
    }
};
