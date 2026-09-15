class Solution {

    public int minOperations(int[] nums1, int[] nums2) {
        // Two fates for the last column: untouched, or swapped once (which
        // exchanges the two targets). For fixed targets every earlier index
        // is independent: keep the pair if it already fits, else swap it if
        // it fits crossed, else the fate is dead.
        int keep = cost(nums1, nums2, true);
        int swap = cost(nums1, nums2, false);
        if (keep == -1 && swap == -1) return -1;
        if (keep == -1) return swap;
        if (swap == -1) return keep;
        return Math.min(keep, swap);
    }

    private int cost(int[] nums1, int[] nums2, boolean keepLast) {
        int n = nums1.length;
        int top1, top2;
        if (keepLast) {
            top1 = nums1[n - 1];
            top2 = nums2[n - 1];
        } else {
            top1 = nums2[n - 1];
            top2 = nums1[n - 1];
        }
        int ops = keepLast ? 0 : 1;
        for (int i = 0; i < n - 1; ++i) {
            int a = nums1[i],
                b = nums2[i];
            if (a <= top1 && b <= top2) continue;
            if (b <= top1 && a <= top2) {
                ++ops;
            } else {
                return -1;
            }
        }
        return ops;
    }
}
