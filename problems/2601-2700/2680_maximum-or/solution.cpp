class Solution {
  public:
    // All k doublings belong on one element: the OR's top bit comes from
    // a single element, and giving that element every operation only
    // pushes its bits higher, so split plans are never better. The
    // boosted element reaches 10^9 * 2^15 < 2^45, past 32-bit range, so
    // it widens to long long before shifting (an int shifted 15 places
    // wraps).
    long long maximumOr(vector<int> &nums, int k) {
        int n = nums.size();
        // suffix[i] = OR of nums[i:], so the OR of every element except i
        // is prefix | suffix in O(1) while i sweeps left to right.
        vector<long long> suffix(n + 1, 0);
        for (int i = n - 1; i >= 0; --i)
            suffix[i] = suffix[i + 1] | nums[i];
        long long best = 0;
        long long prefix = 0;
        for (int i = 0; i < n; ++i) {
            // The full OR with nums[i] << k swapped in for nums[i].
            long long shifted = static_cast<long long>(nums[i]) << k;
            long long candidate = prefix | shifted | suffix[i + 1];
            if (candidate > best)
                best = candidate;
            prefix |= nums[i];
        }
        return best;
    }
};
