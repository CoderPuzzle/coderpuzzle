#include <unordered_set>
#include <vector>

class Solution {
  public:
    int arithmeticTriplets(vector<int> &nums, int diff) {
        // Strictly increasing means every value occurs once, so a triplet is
        // determined by its middle: count elements whose value - diff and
        // value + diff are both present.
        std::unordered_set<int> seen(nums.begin(), nums.end());
        int count = 0;
        for (int value : nums) {
            if (seen.count(value - diff) && seen.count(value + diff)) {
                ++count;
            }
        }
        return count;
    }
};
