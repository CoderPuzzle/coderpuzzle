#include <algorithm>
#include <vector>

class Solution {
  public:
    int minStartValue(std::vector<int> &nums) {
        int minPrefix = 0;
        int prefix = 0;
        for (int x : nums) {
            prefix += x;
            minPrefix = std::min(minPrefix, prefix);
        }
        return std::max(1, 1 - minPrefix);
    }
};
