#include <algorithm>
#include <vector>

class Solution {
  public:
    int maximumAND(vector<int> &nums, int k, int m) {
        // Values are at most 1e9 and k at most 1e9, so every raised value
        // and the answer stay below 2^31 and int carries them all; one
        // element's cost can still approach 2^31 and the m-cost sum 5e4 of
        // them (about 1.1e14), so the sum accumulates in long long.
        // A mask is feasible when m elements can each be raised, total
        // increments within k, to a value carrying every mask bit; deciding
        // bits from high to low and keeping every feasible bit yields the
        // maximum AND.
        int res = 0;
        for (int b = 30; b >= 0; b--) {
            int cand = res | (1 << b);
            vector<long long> costs(nums.size(), 0);
            for (size_t i = 0; i < nums.size(); i++) {
                int num = nums[i];
                int missing = cand & ~num;
                if (missing == 0)
                    continue;
                // With h the highest missing bit, the cheapest target >=
                // num covering cand keeps num's bits above h, sets bit h,
                // and fills cand's bits below h.
                int h = 31 - __builtin_clz((unsigned)missing);
                int t = ((num >> (h + 1)) << (h + 1)) | (1 << h) | (cand & ((1 << h) - 1));
                costs[i] = (long long)t - num;
            }
            // Raises on different indices are independent, so the m
            // cheapest per-element costs decide feasibility.
            sort(costs.begin(), costs.end());
            long long sum = 0;
            for (int i = 0; i < m; i++)
                sum += costs[i];
            if (sum <= k)
                res = cand;
        }
        return res;
    }
};
