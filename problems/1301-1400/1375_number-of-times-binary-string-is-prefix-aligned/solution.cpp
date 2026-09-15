#include <vector>

class Solution {
  public:
    int numTimesAllBlue(std::vector<int> &flips) {
        int rightmost = 0;
        int count = 0;
        for (int i = 0; i < static_cast<int>(flips.size()); i++) {
            rightmost = std::max(rightmost, flips[i]);
            if (rightmost == i + 1)
                count += 1;
        }
        return count;
    }
};
