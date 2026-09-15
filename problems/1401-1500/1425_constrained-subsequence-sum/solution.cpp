class Solution {
  public:
    int constrainedSubsetSum(vector<int> &nums, int k) {
        int n = nums.size();
        vector<long long> dp(n);
        vector<int> dq(n);
        int head = 0, tail = 0;
        long long best = LLONG_MIN;
        for (int i = 0; i < n; i++) {
            while (head < tail && dq[head] < i - k) {
                head++;
            }
            long long prev = head < tail ? dp[dq[head]] : 0;
            if (prev < 0) {
                prev = 0;
            }
            dp[i] = nums[i] + prev;
            while (head < tail && dp[dq[tail - 1]] <= dp[i]) {
                tail--;
            }
            dq[tail++] = i;
            if (dp[i] > best) {
                best = dp[i];
            }
        }
        return (int)best;
    }
};
