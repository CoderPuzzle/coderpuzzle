class Solution {

    private static final long MOD = 1_000_000_007L;

    public int maxSum(int[] nums1, int[] nums2) {
        int i = 0,
            j = 0;
        int n1 = nums1.length,
            n2 = nums2.length;
        // Running sum of each array since the last crossing point, kept as
        // long: with n up to 1e5 and values up to 1e7, an unreduced segment
        // sum can reach roughly 1e12.
        long sum1 = 0,
            sum2 = 0;
        long result = 0;
        while (i < n1 && j < n2) {
            if (nums1[i] < nums2[j]) {
                sum1 += nums1[i];
                ++i;
            } else if (nums1[i] > nums2[j]) {
                sum2 += nums2[j];
                ++j;
            } else {
                // Crossing point: lock in the better of the two segments,
                // plus the shared value itself (counted once), then reset.
                result += Math.max(sum1, sum2) + nums1[i];
                sum1 = 0;
                sum2 = 0;
                ++i;
                ++j;
            }
        }
        // Drain whichever array still has a tail; no more crossings are
        // possible once one array is exhausted.
        while (i < n1) {
            sum1 += nums1[i];
            ++i;
        }
        while (j < n2) {
            sum2 += nums2[j];
            ++j;
        }
        result += Math.max(sum1, sum2);
        return (int) (result % MOD);
    }
}
