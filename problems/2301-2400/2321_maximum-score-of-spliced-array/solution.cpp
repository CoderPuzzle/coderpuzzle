class Solution {
  public:
    int maximumsSplicedArray(vector<int> &nums1, vector<int> &nums2) {
        // A swap moves a contiguous block of difference between the arrays:
        // sum(nums1) changes by the range sum of nums2[i] - nums1[i], and
        // sum(nums2) by the negated amount. Each side's best outcome is its
        // base sum plus a maximum subarray of that difference array. Every
        // total stays in int range: even one array absorbing everything
        // caps at sum(nums1) + sum(nums2) <= 2 * 10^9 < 2^31 - 1.
        auto splicedBest = [](const vector<int> &base, const vector<int> &other) {
            // Kadane clamped at 0 covers "not do anything" for free.
            int base_sum = 0;
            int best_gain = 0;
            int current = 0;
            for (size_t i = 0; i < base.size(); ++i) {
                base_sum += base[i];
                int difference = other[i] - base[i];
                current = max(difference, current + difference);
                best_gain = max(best_gain, current);
            }
            return base_sum + best_gain;
        };
        return max(splicedBest(nums1, nums2), splicedBest(nums2, nums1));
    }
};
