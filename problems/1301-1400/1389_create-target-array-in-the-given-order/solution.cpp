#include <vector>

class Solution {
  public:
    vector<int> createTargetArray(vector<int> &nums, vector<int> &index) {
        // Direct simulation: each step splices nums[i] into the growing
        // vector at position index[i], pushing the tail right. index[i] <= i
        // keeps every insertion inside the array built so far.
        vector<int> target;
        target.reserve(nums.size());
        for (size_t i = 0; i < nums.size(); ++i) {
            target.insert(target.begin() + index[i], nums[i]);
        }
        return target;
    }
};
