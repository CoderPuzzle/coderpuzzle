#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int minimumOperations(std::vector<int> &nums) {
        // An alternating array is fixed by one value for even indices and one
        // different value for odd indices, so the kept elements are exactly
        // the most frequent value on each side. Count both parities in one
        // pass, then keep the best of the four top-1/top-2 combinations.
        int n = static_cast<int>(nums.size());
        if (n == 1) {
            return 0;
        }
        std::unordered_map<int, int> evenCounts;
        std::unordered_map<int, int> oddCounts;
        for (int index = 0; index < n; ++index) {
            auto &counts = (index % 2 == 0) ? evenCounts : oddCounts;
            ++counts[nums[index]];
        }
        int freshValue = *max_element(nums.begin(), nums.end()) + 1;
        auto candidates = [freshValue](const std::unordered_map<int, int> &counts) {
            // Top values plus a fresh fill value worth nothing: the optimal
            // partner need not occur anywhere in nums.
            std::vector<std::pair<int, int>> ranked; // (kept count, value)
            for (const auto &entry : counts) {
                ranked.push_back({entry.second, entry.first});
            }
            std::sort(ranked.begin(), ranked.end(), [](const auto &a, const auto &b) { return a > b; });
            if (ranked.size() > 2) {
                ranked.resize(2);
            }
            ranked.push_back({0, freshValue});
            return ranked;
        };
        int best = n;
        for (const auto &evenEntry : candidates(evenCounts)) {
            for (const auto &oddEntry : candidates(oddCounts)) {
                if (evenEntry.second == oddEntry.second) {
                    continue;
                }
                best = std::min(best, n - evenEntry.first - oddEntry.first);
            }
        }
        return best;
    }
};
