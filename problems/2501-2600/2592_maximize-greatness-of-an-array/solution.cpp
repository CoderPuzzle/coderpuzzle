#include <algorithm>
#include <vector>

class Solution {
  public:
    int maximizeGreatness(std::vector<int> &nums) {
        // Sort the array; then scan a second sorted copy of the same
        // multiset with a fast pointer that always offers the smallest not
        // yet committed value strictly greater than the current element.
        // Spending the cheapest sufficient value on each position in
        // increasing order is an exchange-argument optimum, so the number
        // of commitments is the greatness.
        std::vector<int> supply = nums;
        std::sort(supply.begin(), supply.end());
        std::sort(nums.begin(), nums.end());
        int count = 0;
        int j = 0;
        for (int x : nums) {
            while (j < (int)supply.size() && supply[j] <= x) {
                ++j;
            }
            if (j == (int)supply.size()) {
                break;
            }
            ++count;
            ++j;
        }
        return count;
    }
};
