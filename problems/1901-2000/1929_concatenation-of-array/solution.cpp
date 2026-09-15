#include <vector>

class Solution {
  public:
    std::vector<int> getConcatenation(std::vector<int> &nums) {
        // ans is nums followed by a second copy of nums: each value lands at
        // index i and again at index i + n.
        int n = static_cast<int>(nums.size());
        std::vector<int> ans;
        ans.reserve(2 * n);
        for (int i = 0; i < n; ++i) {
            ans.push_back(nums[i]);
        }
        for (int i = 0; i < n; ++i) {
            ans.push_back(nums[i]);
        }
        return ans;
    }
};
