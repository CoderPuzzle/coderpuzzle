#include <algorithm>
#include <vector>

class Solution {
  public:
    long long minimumRemoval(std::vector<int> &beans) {
        // In a sorted layout, keeping bags equal to the value at index i
        // means: remove everything before i entirely, and trim every later
        // bag down to that value. Each candidate is one arithmetic step;
        // totals reach 10^10 so everything stays in 64-bit integers.
        long long total = 0;
        for (int bean : beans) {
            total += bean;
        }
        std::vector<int> ordered(beans);
        std::sort(ordered.begin(), ordered.end());
        long long best = total; // keep nothing (degenerate floor)
        int n = static_cast<int>(ordered.size());
        for (int index = 0; index < n; ++index) {
            long long keptTotal = static_cast<long long>(ordered[index]) * (n - index);
            best = std::min(best, total - keptTotal);
        }
        return best;
    }
};
