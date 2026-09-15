class Solution {

    public int maxNonDecreasingLength(int[] nums1, int[] nums2) {
        // run1/run2: longest non-decreasing run ending exactly at this index,
        // choosing nums1[i] / nums2[i]. Each transition compares against both
        // previous picks under >=, so a run may switch source arrays anywhere.
        int run1 = 1,
            run2 = 1,
            best = 1;
        for (int i = 1; i < nums1.length; ++i) {
            int next1 = 1;
            if (nums1[i] >= nums1[i - 1]) next1 = Math.max(next1, run1 + 1);
            if (nums1[i] >= nums2[i - 1]) next1 = Math.max(next1, run2 + 1);
            int next2 = 1;
            if (nums2[i] >= nums1[i - 1]) next2 = Math.max(next2, run1 + 1);
            if (nums2[i] >= nums2[i - 1]) next2 = Math.max(next2, run2 + 1);
            run1 = next1;
            run2 = next2;
            best = Math.max(best, Math.max(next1, next2));
        }
        return best;
    }
}
