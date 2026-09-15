#include <unordered_map>
#include <vector>

class Solution {
  public:
    int mostFrequentEven(vector<int> &nums) {
        unordered_map<int, int> counts;
        for (int num : nums) {
            if (num % 2 == 0) {
                ++counts[num];
            }
        }
        int best_value = -1;
        int best_count = 0;
        for (auto &[value, count] : counts) {
            if (count > best_count || (count == best_count && value < best_value)) {
                best_count = count;
                best_value = value;
            }
        }
        return best_value;
    }
};
