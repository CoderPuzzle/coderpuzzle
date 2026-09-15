#include <algorithm>
#include <vector>

class Solution {
  public:
    long long rob(vector<int> &nums, vector<int> &colors) {
        // Bounds: n <= 10^5 and nums[i] <= 10^5, so the rob-everything
        // extreme reaches 10^10 — everything lives comfortably in a long
        // long.
        // prev1/prev2 carry dp[i-1]/dp[i-2]: the best haul from houses up
        // to i-1 / i-2. dp is monotone, so when colors differ the adjacent
        // take nums[i] + dp[i-1] dominates the non-adjacent nums[i] +
        // dp[i-2].
        long long prev2 = 0;
        long long prev1 = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            long long base = colors[i] == colors[i - 1] ? prev2 : prev1;
            long long take = nums[i] + base;
            long long best = prev1 > take ? prev1 : take;
            prev2 = prev1;
            prev1 = best;
        }
        return prev1;
    }
};
