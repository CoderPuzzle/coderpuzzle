#include <algorithm>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    int distinctAverages(vector<int> &nums) {
        // Sort, then pair the i-th smallest with the i-th largest. The
        // average (a + b) / 2 is distinct exactly when the sum a + b is
        // distinct, so track pair sums and never touch floats.
        std::sort(nums.begin(), nums.end());
        std::unordered_set<int> sums;
        int n = (int)nums.size();
        for (int i = 0; i < n / 2; ++i)
            sums.insert(nums[i] + nums[n - 1 - i]);
        return (int)sums.size();
    }
};
