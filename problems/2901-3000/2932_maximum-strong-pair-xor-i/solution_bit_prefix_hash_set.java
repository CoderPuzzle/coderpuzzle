import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int maximumStrongPairXor(int[] nums) {
        // Sorting makes the kindred condition one-sided: a partner y of the
        // larger member x must satisfy x <= 2*y, so each x's partners are a
        // window over the earlier sorted values that two pointers maintain.
        Arrays.sort(nums);
        // counts.get(level) maps a window value's first (level + 1) bits to
        // how many window values carry that prefix; every value is below
        // 128, so seven bits cover them all, and a value leaving the window
        // just decrements its counts instead of invalidating shared
        // prefixes.
        List<Map<Integer, Integer>> counts = new ArrayList<>();
        for (int level = 0; level < 7; ++level) {
            counts.add(new HashMap<>());
        }
        int lo = 0;
        int best = 0;
        for (int i = 0; i < nums.length; ++i) {
            int x = nums[i];
            while (2 * nums[lo] < x) {
                int y = nums[lo];
                int prefix = 0;
                for (int level = 0; level < 7; ++level) {
                    prefix = prefix * 2 + ((y >> (6 - level)) & 1);
                    if (counts.get(level).merge(prefix, -1, Integer::sum) == 0) {
                        counts.get(level).remove(prefix);
                    }
                }
                ++lo;
            }
            // Greedy walk over x's bits, high to low: keep a bit exactly
            // when the partner prefix that completes it is itself in the
            // window.
            int prefix = 0;
            int ans = 0;
            for (int level = 0; level < 7; ++level) {
                prefix = prefix * 2 + ((x >> (6 - level)) & 1);
                int wanted = prefix ^ (ans * 2 + 1);
                ans = counts.get(level).containsKey(wanted) ? ans * 2 + 1 : ans * 2;
            }
            best = Math.max(best, ans);
            // Admit x for the larger values still to come.
            prefix = 0;
            for (int level = 0; level < 7; ++level) {
                prefix = prefix * 2 + ((x >> (6 - level)) & 1);
                counts.get(level).merge(prefix, 1, Integer::sum);
            }
        }
        return best;
    }
}
