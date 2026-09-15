class Solution {
  public:
    long long maximumProduct(vector<int> &nums, int m) {
        // A size-m subsequence with first index i and last index j
        // exists iff j >= i + m - 1. For m == 1 first and last are the
        // same element, so the answer is the best square. Otherwise
        // sweep i downward: the eligible window nums[i + m - 1:] grows
        // by one entry per step, so its max and min update in O(1), and
        // one of those two extremes is always the best partner for
        // nums[i]. Products reach 1e5 * 1e5, so long long is required.
        int n = nums.size();
        if (m == 1) {
            long long best = LLONG_MIN;
            for (int v : nums)
                best = max(best, (long long)v * v);
            return best;
        }
        long long smax = nums[n - 1], smin = nums[n - 1];
        long long best = (long long)nums[n - m] * nums[n - 1];
        for (int i = n - m - 1; i >= 0; --i) {
            int v = nums[i + m - 1];
            if (v > smax)
                smax = v;
            else if (v < smin)
                smin = v;
            best = max(best, max((long long)nums[i] * smax, (long long)nums[i] * smin));
        }
        return best;
    }
};
