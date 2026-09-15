class Solution {

    public long minOperations(int[] nums1, int[] nums2) {
        // Every slot i != j pays |nums1[i] - nums2[i]|, and the chosen source
        // j pays that same per-slot cost plus one append plus the distance
        // from the tail value to the span between nums1[j] and nums2[j].
        // The base sum is common to every choice, so only the tail-to-span
        // distance varies; take its minimum. Sums reach 1e10, so 64-bit.
        int n = nums1.length;
        long base = 0;
        for (int i = 0; i < n; i++) {
            base += Math.abs((long) nums1[i] - nums2[i]);
        }
        long tail = nums2[n];
        long bestGap = Long.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            long a = nums1[i],
                b = nums2[i];
            long lo = Math.min(a, b),
                hi = Math.max(a, b);
            long gap = 0;
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
}
