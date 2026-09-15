#include <algorithm>
#include <vector>

class Solution {
  public:
    long long maximumBeauty(vector<int> &flowers, long long newFlowers, int target, int full, int partial) {
        sort(flowers.begin(), flowers.end());
        int n = flowers.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + flowers[i];
        }
        long long best = 0;
        long long budget = newFlowers;
        for (int complete = 0; complete <= n; complete++) {
            if (complete > 0) {
                long long need = max(0LL, static_cast<long long>(target) - flowers[n - complete]);
                if (budget < need) {
                    break;
                }
                budget -= need;
            }
            int rest = n - complete;
            if (rest == 0) {
                best = max(best, static_cast<long long>(complete) * full);
                break;
            }
            if (flowers[rest - 1] >= target) {
                // every remaining garden is already complete; that split is
                // dominated by completing all of them for free.
                continue;
            }
            // Highest reachable minimum among the remaining gardens.
            long long low = flowers[0];
            long long high = static_cast<long long>(target) - 1;
            long long best_min = low;
            while (low <= high) {
                long long mid = low + (high - low) / 2;
                int pos = lower_bound(flowers.begin(), flowers.begin() + rest, static_cast<int>(mid)) - flowers.begin();
                long long cost = mid * pos - prefix[pos];
                if (cost <= budget) {
                    best_min = mid;
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            best = max(best, static_cast<long long>(complete) * full + best_min * partial);
        }
        return best;
    }
};
