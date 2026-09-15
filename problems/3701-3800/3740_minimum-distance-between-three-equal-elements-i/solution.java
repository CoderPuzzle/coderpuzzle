import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minimumDistance(int[] nums) {
        // Sorted as a < b < c, a good tuple's distance collapses to
        // (b - a) + (c - b) + (c - a) = 2 * (c - a): only the outermost
        // indices matter, so the tightest triple of a value spans three
        // consecutive occurrences of it.
        int best = -1;
        // Last two indices seen for each value (-1 marks "not seen yet");
        // any older occurrence can only widen the span, so it never
        // matters again.
        Map<Integer, int[]> recent = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int[] last = recent.get(nums[i]);
            if (last == null) {
                last = new int[] { -1, -1 };
                recent.put(nums[i], last);
            }
            if (last[0] != -1) {
                int distance = 2 * (i - last[0]);
                if (best == -1 || distance < best) {
                    best = distance;
                }
            }
            last[0] = last[1];
            last[1] = i;
        }
        return best;
    }
}
