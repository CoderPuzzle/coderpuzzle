#include <algorithm>
#include <vector>

class Solution {
  public:
    int maximumCount(std::vector<int> &nums) {
        // In a sorted array the negatives are exactly the prefix ending
        // before the first value >= 0 and the positives are exactly the
        // suffix starting at the first value >= 1. Two lower_bound calls
        // fix both boundaries in O(log n); zeros belong to neither side.
        int neg = std::lower_bound(nums.begin(), nums.end(), 0) - nums.begin();
        auto first_pos = std::lower_bound(nums.begin(), nums.end(), 1);
        int pos = nums.end() - first_pos;
        return neg > pos ? neg : pos;
    }
};
