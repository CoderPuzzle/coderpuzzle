import java.util.Arrays;
import java.util.HashMap;

class Solution {

    public int minimumAddedInteger(int[] nums1, int[] nums2) {
        // Sorted correspondence forces x = min(nums2) - keptMin, and two
        // removals leave the kept minimum at sorted index <= 2, so only the
        // three candidates nums2min - sorted(nums1)[r] for r in {0,1,2} can
        // work. Each candidate is validated by consuming a count of nums1
        // against every nums2 element minus x; the smallest survivor wins.
        int[] sa = nums1.clone();
        Arrays.sort(sa);
        int loB = Integer.MAX_VALUE;
        for (int v : nums2) {
            loB = Math.min(loB, v);
        }
        Integer best = null;
        for (int r = 0; r < 3; r++) {
            int x = loB - sa[r];
            HashMap<Integer, Integer> pool = new HashMap<>();
            for (int v : nums1) {
                pool.merge(v, 1, Integer::sum);
            }
            boolean ok = true;
            for (int v : nums2) {
                int need = v - x;
                if (pool.getOrDefault(need, 0) == 0) {
                    ok = false;
                    break;
                }
                pool.merge(need, -1, Integer::sum);
            }
            if (ok && (best == null || x < best)) {
                best = x;
            }
        }
        return best;
    }
}
