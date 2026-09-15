import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] mergeArrays(int[][] nums1, int[][] nums2) {
        // Both inputs are sorted by id, so two pointers walk them in
        // lockstep, always emitting the smaller head id next: shared ids
        // merge their values, single-side ids pass through unchanged. The
        // result is sorted by construction and holds each id once.
        List<int[]> merged = new ArrayList<>();
        int i = 0;
        int j = 0;
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i][0] == nums2[j][0]) {
                merged.add(new int[] { nums1[i][0], nums1[i][1] + nums2[j][1] });
                ++i;
                ++j;
            } else if (nums1[i][0] < nums2[j][0]) {
                merged.add(nums1[i].clone());
                ++i;
            } else {
                merged.add(nums2[j].clone());
                ++j;
            }
        }
        // One tail is empty here; the other carries its remaining rows.
        while (i < nums1.length) merged.add(nums1[i++].clone());
        while (j < nums2.length) merged.add(nums2[j++].clone());
        return merged.toArray(new int[merged.size()][]);
    }
}
