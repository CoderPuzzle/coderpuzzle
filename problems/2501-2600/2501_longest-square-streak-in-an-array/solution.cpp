#include <algorithm>
#include <cmath>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int longestSquareStreak(std::vector<int> &nums) {
        // A sorted streak always steps v -> v*v, so scanning the distinct
        // values ascending makes each value extend at most one chain: the
        // one ending at its integer square root, when that root is itself
        // present. Roots stay below 317, so squaring them cannot overflow.
        std::vector<int> values(nums.begin(), nums.end());
        std::sort(values.begin(), values.end());
        values.erase(std::unique(values.begin(), values.end()), values.end());
        std::unordered_map<int, int> length;
        int longest = 0;
        for (int value : values) {
            int root = (int)(std::sqrt((double)value) + 0.5);
            auto found = length.find(root);
            int len = (found != length.end() && (long long)root * root == value) ? found->second + 1 : 1;
            length[value] = len;
            longest = std::max(longest, len);
        }
        return longest >= 2 ? longest : -1;
    }
};
