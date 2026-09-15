#include <algorithm>
#include <vector>

class Solution {
  public:
    std::vector<bool> kidsWithCandies(std::vector<int> &candies, int extraCandies) {
        int maximum = *std::max_element(candies.begin(), candies.end());
        std::vector<bool> result;
        result.reserve(candies.size());
        for (int count : candies) {
            result.push_back(count + extraCandies >= maximum);
        }
        return result;
    }
};
