import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minOperations(int[] nums) {
        // Each removal takes out one strictly increasing subsequence, so a
        // non-increasing chain (x >= y in order) must span distinct removals;
        // by Dilworth's theorem the answer is the longest non-increasing
        // subsequence length.
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            // Negate and bisect_right: equal values extend the same pile,
            // turning patience sorting's "longest strictly increasing" into
            // "longest non-increasing" for the original values.
            int v = -x;
            int lo = 0,
                hi = tails.size();
            // Manual bisect_right: first pile top greater than v.
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (tails.get(mid) <= v) lo = mid + 1;
                else hi = mid;
            }
            // The value opens a new pile (append) or replaces the leftmost
            // pile top it can sit on; piles stay sorted, and their count is
            // the answer.
            if (lo == tails.size()) tails.add(v);
            else tails.set(lo, v);
        }
        return tails.size();
    }
}
