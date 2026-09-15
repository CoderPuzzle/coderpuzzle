#include <unordered_set>
#include <vector>

class Solution {
  public:
    std::vector<int> distinctDifferenceArray(std::vector<int> &nums) {
        // One right-to-left pass records how many distinct values survive
        // after each index, then a left-to-right pass grows the prefix set,
        // so every answer is a single subtraction of two maintained counts.
        int n = (int)nums.size();
        std::vector<int> suffix_distinct(n);
        std::unordered_set<int> seen;
        for (int i = n - 1; i >= 0; --i) {
            // Visited values are exactly those right of i, so this records
            // the distinct count of nums[i + 1, ..., n - 1] itself.
            suffix_distinct[i] = (int)seen.size();
            seen.insert(nums[i]);
        }
        std::unordered_set<int> prefix_seen;
        std::vector<int> result;
        result.reserve(n);
        for (int i = 0; i < n; ++i) {
            prefix_seen.insert(nums[i]);
            result.push_back(prefix_seen.size() - suffix_distinct[i]);
        }
        return result;
    }
};
