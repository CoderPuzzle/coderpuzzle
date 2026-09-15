#include <numeric>

class Solution {
  public:
    int validSubarraySplit(vector<int> &nums) {
        // dp[i] = fewest subarrays to validly split nums[:i]; dp[0] = 0.
        // The last subarray ends at i - 1, so its start j must satisfy
        // gcd(nums[j], nums[i - 1]) > 1, giving the transition dp[j] + 1.
        int n = (int)nums.size();
        int inf = n + 1;
        vector<int> dp(n + 1, inf);
        dp[0] = 0;
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < i; ++j) {
                if (std::gcd(nums[j], nums[i - 1]) > 1 && dp[j] + 1 < dp[i])
                    dp[i] = dp[j] + 1;
            }
        }
        return dp[n] < inf ? dp[n] : -1;
    }
};
