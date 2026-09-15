class Solution {
  public:
    int minAbsoluteSumDiff(vector<int> &nums1, vector<int> &nums2) {
        // The initial sum is fixed; a replacement at index i can only cut
        // |nums1[i] - nums2[i]| down to the distance from nums2[i] to the
        // nearest value in nums1, so hunt that nearest value in a sorted
        // copy and keep the largest saving seen.
        const long long MOD = 1000000007;
        vector<int> sorted1(nums1);
        sort(sorted1.begin(), sorted1.end());
        // the raw sum tops out at 10^10 — beyond 32-bit — so it accumulates
        // in a long long and narrows only after the modulo
        long long total = 0;
        long long bestGain = 0;
        for (int i = 0; i < (int)nums1.size(); ++i) {
            long long diff = abs((long long)nums1[i] - nums2[i]);
            total += diff;
            // neighbors of nums2[i] in the sorted copy bracket the nearest value
            long long nearest = diff;
            auto upper = lower_bound(sorted1.begin(), sorted1.end(), nums2[i]);
            if (upper != sorted1.end())
                nearest = min(nearest, (long long)*upper - nums2[i]);
            if (upper != sorted1.begin())
                nearest = min(nearest, (long long)nums2[i] - *prev(upper));
            bestGain = max(bestGain, diff - nearest);
        }
        return (int)((total - bestGain) % MOD);
    }
};
