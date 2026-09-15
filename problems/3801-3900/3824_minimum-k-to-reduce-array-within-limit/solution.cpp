#include <algorithm>
#include <vector>

class Solution {
  public:
    int minimumK(vector<int> &nums) {
        // An element v needs ceil(v / k) reduce-by-k operations, so
        // nonPositive(nums, k) is the sum of those ceilings. Feasibility
        // is monotone in k: every ceiling only shrinks as k grows while
        // k * k strictly grows, so binary search finds the smallest
        // feasible k.
        // Totals reach 1e5 * 1e5 = 1e10 and squares of k reach 1e10 as
        // well, beyond int, so the running sum and the square are long
        // long.
        auto feasible = [&](long long k) {
            long long total = 0;
            for (int value : nums)
                total += (value + k - 1) / k;
            return total <= k * k;
        };
        // Warm-up: once k >= max(nums) every ceiling is exactly 1, so
        // nonPositive(nums, k) == n there; doubling max(nums) until
        // feasible stops at the first power-of-two multiple with
        // k * k >= n.
        long long hi = *max_element(nums.begin(), nums.end());
        while (!feasible(hi))
            hi *= 2;
        long long lo = 1;
        while (lo < hi) {
            long long mid = (lo + hi) / 2;
            if (feasible(mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return (int)lo;
    }
};
