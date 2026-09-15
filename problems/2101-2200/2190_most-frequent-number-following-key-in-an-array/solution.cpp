#include <unordered_map>
#include <vector>

class Solution {
  public:
    int mostFrequent(std::vector<int> &nums, int key) {
        // Count each value that immediately follows a key occurrence and
        // take the argmax; the input guarantees a unique winner.
        std::unordered_map<int, int> counts;
        int best_value = 0;
        int best_count = -1;
        for (int i = 0; i + 1 < static_cast<int>(nums.size()); ++i) {
            if (nums[i] == key) {
                ++counts[nums[i + 1]];
            }
        }
        for (const auto &entry : counts) {
            if (entry.second > best_count) {
                best_count = entry.second;
                best_value = entry.first;
            }
        }
        return best_value;
    }
};
