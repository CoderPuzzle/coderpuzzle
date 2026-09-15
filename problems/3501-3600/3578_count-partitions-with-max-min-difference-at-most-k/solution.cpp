class Solution {
  public:
    int countPartitions(vector<int> &nums, int k) {
        // dp[i + 1] = ways to partition the first i + 1 elements. The last
        // segment is nums[j..i] for some start j; valid starts form a
        // contiguous range ending at i, grown by lowering lo until the
        // window spread is <= k. Monotonic deques expose the window
        // min/max, pre holds prefix sums of dp so a range sum is one
        // subtraction.
        const long long MOD = 1000000007LL;
        int n = nums.size();
        vector<long long> dp(n + 1, 0), pre(n + 2, 0);
        dp[0] = 1;
        pre[1] = 1;
        int lo = 0;
        deque<int> mins; // indices, values increasing toward the back
        deque<int> maxs; // indices, values decreasing toward the back
        for (int i = 0; i < n; ++i) {
            while (!mins.empty() && nums[mins.back()] >= nums[i])
                mins.pop_back();
            mins.push_back(i);
            while (!maxs.empty() && nums[maxs.back()] <= nums[i])
                maxs.pop_back();
            maxs.push_back(i);
            while (nums[maxs.front()] - nums[mins.front()] > k) {
                if (mins.front() == lo)
                    mins.pop_front();
                if (maxs.front() == lo)
                    maxs.pop_front();
                ++lo;
            }
            dp[i + 1] = (pre[i + 1] - pre[lo] + MOD) % MOD;
            pre[i + 2] = (pre[i + 1] + dp[i + 1]) % MOD;
        }
        return (int)dp[n];
    }
};
