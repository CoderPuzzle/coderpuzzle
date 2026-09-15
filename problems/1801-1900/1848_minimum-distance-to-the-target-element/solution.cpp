#include <cstdlib>
#include <vector>

class Solution {
  public:
    // One scan: the closest occurrence of target is whichever index
    // minimizes abs(i - start).
    int getMinDistance(std::vector<int> &nums, int target, int start) {
        int best = nums.size();
        for (int i = 0; i < (int)nums.size(); i++) {
            if (nums[i] == target) {
                best = std::min(best, std::abs(i - start));
            }
        }
        return best;
    }
};
