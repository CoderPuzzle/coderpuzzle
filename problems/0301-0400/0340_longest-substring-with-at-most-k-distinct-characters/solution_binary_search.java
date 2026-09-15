import java.util.HashMap;
import java.util.Map;

class Solution {

    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        // A substring of a valid window is valid too, so feasibility is
        // monotone in the length — binary search for the longest feasible.
        int lo = 0,
            hi = s.length();
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (feasible(s, k, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    // Feasibility of a fixed length: does any window of exactly length
    // symbols carry at most k distinct ones? One sweep maintains the
    // multiplicities of the current window, sliding its left edge out one
    // step behind its right edge.
    private boolean feasible(String s, int k, int length) {
        if (length == 0) {
            return true;
        }
        Map<Character, Integer> counts = new HashMap<>();
        int distinct = 0;
        for (int i = 0; i < s.length(); i++) {
            char incoming = s.charAt(i);
            counts.merge(incoming, 1, Integer::sum);
            if (counts.get(incoming) == 1) {
                distinct++;
            }
            if (i >= length) {
                char outgoing = s.charAt(i - length);
                counts.merge(outgoing, -1, Integer::sum);
                if (counts.get(outgoing) == 0) {
                    distinct--;
                }
            }
            if (i >= length - 1 && distinct <= k) {
                return true;
            }
        }
        return false;
    }
}
