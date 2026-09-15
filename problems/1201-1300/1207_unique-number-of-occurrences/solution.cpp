#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    bool uniqueOccurrences(vector<int> &arr) {
        // Count every value, then test each count for a repeat: the answer
        // is false exactly when a second value reports the same frequency.
        unordered_map<int, int> counts;
        for (int value : arr) {
            ++counts[value];
        }
        unordered_set<int> seen;
        for (const auto &entry : counts) {
            if (!seen.insert(entry.second).second) {
                return false;
            }
        }
        return true;
    }
};
