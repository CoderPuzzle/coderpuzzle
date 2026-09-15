#include <vector>

class Solution {
  public:
    bool kLengthApart(std::vector<int> &nums, int k) {
        int previous = -1;
        for (int index = 0; index < (int)nums.size(); index++) {
            if (nums[index] == 1) {
                if (previous >= 0 && index - previous <= k) {
                    return false;
                }
                previous = index;
            }
        }
        return true;
    }
};
