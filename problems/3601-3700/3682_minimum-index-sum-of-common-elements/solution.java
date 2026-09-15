import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minimumSum(int[] nums1, int[] nums2) {
        // For a shared value the two indices are independent, so its best
        // good pair is its first occurrence in each array: minimizing i and
        // j separately minimizes i + j. Record every value's first index in
        // nums1, never overwriting an earlier one.
        Map<Integer, Integer> firstIndex = new HashMap<>();
        for (int i = 0; i < nums1.length; ++i) {
            if (!firstIndex.containsKey(nums1[i])) {
                firstIndex.put(nums1[i], i);
            }
        }
        // One pass over nums2: every value the map knows scores
        // firstIndex[nums2[j]] + j, and the smallest score wins. The flag
        // stays -1 when nothing matched.
        int best = -1;
        for (int j = 0; j < nums2.length; ++j) {
            Integer earlier = firstIndex.get(nums2[j]);
            if (earlier != null) {
                int total = earlier + j;
                if (best == -1 || total < best) {
                    best = total;
                }
            }
        }
        return best;
    }
}
