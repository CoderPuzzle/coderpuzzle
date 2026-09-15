#include <algorithm>
#include <vector>

class Solution {
  public:
    long long minimalKSum(std::vector<int> &nums, int k) {
        // Take the k smallest missing positives: sort distinct values,
        // consume each gap with an arithmetic-series sum, then spill into
        // the tail. Sums reach ~k^2/2 with k up to 10^8, so long long.
        std::vector<int> ordered(nums);
        std::sort(ordered.begin(), ordered.end());
        ordered.erase(std::unique(ordered.begin(), ordered.end()), ordered.end());
        long long total = 0;
        long long taken = 0;
        long long previous = 0;
        for (int value : ordered) {
            if (taken >= k) {
                break;
            }
            long long gap = static_cast<long long>(value) - previous - 1;
            if (gap > 0) {
                long long use = std::min(gap, static_cast<long long>(k) - taken);
                total += use * (previous + 1) + use * (use - 1) / 2;
                taken += use;
            }
            previous = value;
        }
        if (taken < k) {
            long long use = static_cast<long long>(k) - taken;
            total += use * (previous + 1) + use * (use - 1) / 2;
        }
        return total;
    }
};
