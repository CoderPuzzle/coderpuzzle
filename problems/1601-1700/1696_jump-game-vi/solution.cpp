class Solution {
  public:
    long long maxResult(vector<int> &nums, int k) {
        int n = (int)nums.size();
        vector<long long> dp(n);
        dp[0] = nums[0];
        deque<int> window{0};
        // The deque holds indices with strictly decreasing dp values; it turns
        // dp[i] = nums[i] + max(dp[i-k .. i-1]) into a sliding-window maximum
        // answered in amortized O(1) per step.
        for (int i = 1; i < n; i++) {
            // Expire front indices that left the [i-k, i-1] hop window; the
            // front is then exactly the window's maximum.
            while (window.front() < i - k) {
                window.pop_front();
            }
            dp[i] = nums[i] + dp[window.front()];
            // Back entries with dp <= dp[i] can never be a window max again
            // while i is alive; <= also collapses equal scores.
            while (!window.empty() && dp[window.back()] <= dp[i]) {
                window.pop_back();
            }
            window.push_back(i);
        }
        return dp[n - 1];
    }
};
