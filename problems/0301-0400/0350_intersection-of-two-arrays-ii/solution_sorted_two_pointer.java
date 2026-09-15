import java.util.Arrays;

class Solution {

    public int[] intersect(int[] nums1, int[] nums2) {
        // Sort both arrays ascending, then walk them with one index each:
        // the smaller current value can no longer be matched and advances
        // alone, while equal currents are a shared copy — both advance
        // together, so every value joins exactly min(count1, count2) times.
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        int[] picked = new int[Math.min(nums1.length, nums2.length)];
        int size = 0;
        int i = 0;
        int j = 0;
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] == nums2[j]) {
                picked[size++] = nums1[i];
                i++;
                j++;
            } else if (nums1[i] < nums2[j]) {
                i++;
            } else {
                j++;
            }
        }
        // The walk visits values in ascending order, so the picks leave the
        // loop already in the ascending order the judge requires.
        return Arrays.copyOf(picked, size);
    }
}
