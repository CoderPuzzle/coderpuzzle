import java.util.*;

class Solution {

    // Rearrangement inequality: ascending x descending pairing minimizes
    // the sum of products over all rearrangements of nums1.
    public long minProductSum(int[] nums1, int[] nums2) {
        Arrays.sort(nums1);
        Integer[] boxed = new Integer[nums2.length];
        for (int i = 0; i < nums2.length; i++) {
            boxed[i] = nums2[i];
        }
        Arrays.sort(boxed, Collections.reverseOrder());
        long total = 0;
        for (int i = 0; i < nums1.length; i++) {
            total += (long) nums1[i] * boxed[i];
        }
        return total;
    }
}
