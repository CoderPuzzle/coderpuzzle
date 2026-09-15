#include <vector>

class Solution {
  public:
    int maximumCount(std::vector<int> &nums) {
        // The statement defines the answer outright: neg counts the entries
        // below zero, pos counts the entries above zero, and zeros join
        // neither camp. One walk over nums tallies both counts.
        int neg = 0;
        int pos = 0;
        for (int value : nums) {
            if (value < 0) {
                ++neg;
            } else if (value > 0) {
                ++pos;
            }
        }
        return neg > pos ? neg : pos;
    }
};
