import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maximumLength(int[] nums, int k) {
        // One row per change budget: row[v][a] is the longest good
        // subsequence using exactly a changes and ending on value v;
        // endsAll[a] mirrors the best over all endings. Same-valued
        // tails extend for free, everything else spends one budget
        // step, and both reads use stats frozen before this element.
        Map<Integer, int[]> ends = new HashMap<>();
        int[] endsAll = new int[k + 1];
        int best = 0;
        for (int x : nums) {
            int[] row = ends.computeIfAbsent(x, v -> new int[k + 1]);
            int[] computed = new int[k + 1];
            for (int a = 0; a <= k; ++a) {
                int prior = a == 0 ? 0 : endsAll[a - 1];
                computed[a] = Math.max(row[a], prior) + 1;
            }
            for (int a = 0; a <= k; ++a) {
                if (computed[a] > row[a]) {
                    row[a] = computed[a];
                }
                if (computed[a] > endsAll[a]) {
                    endsAll[a] = computed[a];
                }
                if (endsAll[a] > best) {
                    best = endsAll[a];
                }
            }
        }
        return best;
    }
}
