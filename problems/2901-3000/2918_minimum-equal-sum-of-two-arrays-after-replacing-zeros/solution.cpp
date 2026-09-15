class Solution {
  public:
    long long minSum(vector<int> &nums1, vector<int> &nums2) {
        // Sums reach 10^5 * 10^6 = 10^11, past 32 bits: keep every sum in
        // long long.
        long long sum1 = 0, sum2 = 0;
        long long zeros1 = 0, zeros2 = 0;
        for (int num : nums1) {
            sum1 += num;
            zeros1 += num == 0;
        }
        for (int num : nums2) {
            sum2 += num;
            zeros2 += num == 0;
        }
        // Cheapest fill: every zero becomes 1. An array with no zeros is
        // stuck at its exact sum and can never move.
        if (zeros1 == 0 && zeros2 == 0) {
            return sum1 == sum2 ? sum1 : -1;
        }
        if (zeros1 == 0) {
            // nums2 can take any sum >= sum2 + zeros2, so it must be able to
            // climb exactly to the stuck sum1.
            return sum1 >= sum2 + zeros2 ? sum1 : -1;
        }
        if (zeros2 == 0) {
            return sum2 >= sum1 + zeros1 ? sum2 : -1;
        }
        // Both arrays can climb freely from their all-1 fill: meet at the
        // higher floor.
        return max(sum1 + zeros1, sum2 + zeros2);
    }
};
