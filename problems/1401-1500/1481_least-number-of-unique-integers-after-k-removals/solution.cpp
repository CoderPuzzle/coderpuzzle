#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int findLeastNumOfUniqueInts(std::vector<long long> &arr, int k) {
        std::unordered_map<long long, int> counts;
        for (long long value : arr) {
            counts[value] += 1;
        }
        std::vector<int> freqs;
        freqs.reserve(counts.size());
        for (const auto &entry : counts) {
            freqs.push_back(entry.second);
        }
        std::sort(freqs.begin(), freqs.end());
        int remaining = (int)freqs.size();
        for (int count : freqs) {
            if (k >= count) {
                k -= count;
                remaining -= 1;
            } else {
                break;
            }
        }
        return remaining;
    }
};
