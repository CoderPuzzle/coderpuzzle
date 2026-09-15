#include <vector>

class Solution {
  public:
    long long minIncrease(vector<int> &nums) {
        // Special indices are strict peaks that can only be raised, so two of
        // them can never be adjacent: the achievable maximum is a largest
        // independent set of the interior positions, and the cheapest such set
        // is the answer. Raising i above both original neighbours costs
        // max(0, max(nums[i-1], nums[i+1]) + 1 - nums[i]) — a peak's neighbours
        // are never peaks themselves, so they keep their original values.
        int n = (int)nums.size();
        const long long INF = 4e18;
        // Best (count, cost) pair up to the current position, keyed by whether
        // that position is picked; the comparison is (max count, min cost).
        int notCount = 0;
        long long notCost = 0;
        int pickCount = -1;
        long long pickCost = INF;
        for (int i = 1; i < n - 1; i++) {
            long long cost = max(0LL, max(nums[i - 1], nums[i + 1]) + 1LL - nums[i]);
            // Picking i requires the previous position to be unpicked.
            int curPickCount = notCount + 1;
            long long curPickCost = notCost + cost;
            // Skipping i keeps whichever previous state is better.
            int curNotCount;
            long long curNotCost;
            if (pickCount > notCount || (pickCount == notCount && pickCost < notCost)) {
                curNotCount = pickCount;
                curNotCost = pickCost;
            } else {
                curNotCount = notCount;
                curNotCost = notCost;
            }
            notCount = curNotCount;
            notCost = curNotCost;
            pickCount = curPickCount;
            pickCost = curPickCost;
        }
        if (pickCount > notCount || (pickCount == notCount && pickCost < notCost)) {
            return pickCost;
        }
        return notCost;
    }
};
