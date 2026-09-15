import java.util.HashMap;
import java.util.Map;

class Solution {

    public int widestPairOfIndices(int[] nums1, int[] nums2) {
        // Track the running prefix difference (sum1 - sum2); a range has
        // equal sums in both arrays iff the difference repeats. Seed the
        // empty prefix's value 0 at -1 so pairs starting at index 0 measure
        // correctly.
        Map<Integer, Integer> first = new HashMap<>();
        first.put(0, -1);
        int diff = 0;
        int best = 0;
        for (int i = 0; i < nums1.length; i++) {
            diff += nums1[i] - nums2[i];
            // A repeated difference spans a valid pair; keeping only each
            // value's FIRST occurrence maximizes every later span using it.
            Integer prev = first.get(diff);
            if (prev != null) {
                int w = i - prev;
                if (w > best) best = w;
            } else {
                first.put(diff, i);
            }
        }
        return best;
    }
}
