import java.util.Arrays;

class Solution {

    public int minAbsoluteSumDiff(int[] nums1, int[] nums2) {
        // The initial sum is fixed; a replacement at index i can only cut
        // |nums1[i] - nums2[i]| down to the distance from nums2[i] to the
        // nearest value in nums1, so hunt that nearest value in a sorted
        // copy and keep the largest saving seen.
        final int MOD = 1000000007;
        int[] sorted1 = nums1.clone();
        Arrays.sort(sorted1);
        // the raw sum tops out at 10^10 — beyond 32-bit — so it accumulates
        // in a long and narrows only after the modulo
        long total = 0;
        long bestGain = 0;
        for (int i = 0; i < nums1.length; i++) {
            long diff = Math.abs((long) nums1[i] - nums2[i]);
            total += diff;
            // neighbors of nums2[i] in the sorted copy bracket the nearest value
            int lo = 0;
            int hi = sorted1.length;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (sorted1[mid] < nums2[i]) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            long nearest = diff;
            if (lo < sorted1.length) {
                nearest = Math.min(nearest, (long) sorted1[lo] - nums2[i]);
            }
            if (lo > 0) {
                nearest = Math.min(nearest, (long) nums2[i] - sorted1[lo - 1]);
            }
            bestGain = Math.max(bestGain, diff - nearest);
        }
        return (int) ((total - bestGain) % MOD);
    }
}
