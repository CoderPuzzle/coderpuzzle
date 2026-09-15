#include <algorithm>
#include <vector>

class Solution {
  public:
    std::vector<int> sortJumbled(std::vector<int> &mapping, std::vector<int> &nums) {
        // Map each number once, then sort decorated pairs (mapped value,
        // original index) so equal keys keep their input order.
        auto mapped = [&mapping](long long value) -> long long {
            if (value == 0) {
                return mapping[0];
            }
            long long out = 0;
            long long scale = 1;
            long long rest = value;
            while (rest) {
                out += static_cast<long long>(mapping[rest % 10]) * scale;
                scale *= 10;
                rest /= 10;
            }
            return out;
        };
        std::vector<std::pair<long long, int>> keyed;
        keyed.reserve(nums.size());
        for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
            keyed.emplace_back(mapped(nums[i]), i);
        }
        std::stable_sort(keyed.begin(), keyed.end());
        std::vector<int> result;
        result.reserve(nums.size());
        for (const auto &entry : keyed) {
            result.push_back(nums[entry.second]);
        }
        return result;
    }
};
