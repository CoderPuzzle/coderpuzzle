#include <cstdlib>

class Solution {
  public:
    int maxAdjacentDistance(vector<int> &nums) {
        // One pass over the n circular edges: pair i with (i + 1) % n, so
        // the last iteration compares the last and first elements.
        int ans = 0;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            int d = abs(nums[i] - nums[(i + 1) % n]);
            ans = max(ans, d);
        }
        return ans;
    }
};
