class Solution {

    // Two pointers: as i grows, nums1[i] shrinks, so the farthest usable j
    // never moves left. Advance j as far as validity allows.
    public int maxDistance(int[] nums1, int[] nums2) {
        int best = 0;
        int j = 0;
        for (int i = 0; i < nums1.length; i++) {
            while (j < nums2.length && (j < i || nums2[j] >= nums1[i])) {
                j++;
            }
            if (j > i && nums2[j - 1] >= nums1[i]) {
                best = Math.max(best, j - 1 - i);
            }
        }
        return best;
    }
}
