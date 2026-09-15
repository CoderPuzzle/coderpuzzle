class Solution {
  public:
    long long minOperations(vector<int> &nums1, vector<int> &nums2) {
        // Every slot i != j pays |nums1[i] - nums2[i]|, and the chosen source
        // j pays that same per-slot cost plus one append plus the distance
        // from the tail value to the span between nums1[j] and nums2[j].
        // The base sum is common to every choice, so only the tail-to-span
        // distance varies; take its minimum. Sums reach 1e10, so 64-bit.
        int n = nums1.size();
        long long base = 0;
        for (int i = 0; i < n; i++) {
            base += abs(nums1[i] - nums2[i]);
        }
        long long tail = nums2[n];
        long long bestGap = LLONG_MAX;
        for (int i = 0; i < n; i++) {
            long long a = nums1[i], b = nums2[i];
            long long lo = min(a, b), hi = max(a, b);
            long long gap = 0;
            if (tail < lo) {
                gap = lo - tail;
            } else if (tail > hi) {
                gap = tail - hi;
            }
            if (gap < bestGap) {
                bestGap = gap;
            }
        }
        return base + 1 + bestGap;
    }
};
