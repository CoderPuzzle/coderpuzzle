#include <algorithm>
#include <vector>

class Solution {
  public:
    long long maximumTripletValue(std::vector<int> &nums) {
        // One pass with two running prefix maxima: while treating the
        // current element as k, best_diff already holds the largest
        // nums[i] - nums[j] over i < j before it, so extending that best
        // pair by nums[k] covers every triplet ending here without ever
        // re-scanning the prefix.  The answer is bounded by
        // (10^6 - 1) * 10^6, which is why it rides in a long long.
        long long best = 0;       // all-negative answers collapse to 0
        long long best_diff = 0;  // max nums[i] - nums[j] over pairs passed
        long long max_prefix = 0; // max nums[i] over indices passed
        for (int x : nums) {
            best = std::max(best, best_diff * x);
            best_diff = std::max(best_diff, max_prefix - x);
            max_prefix = std::max(max_prefix, (long long)x);
        }
        return best;
    }
};
