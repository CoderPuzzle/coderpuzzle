import java.util.*;

class Solution {

    public int longestWPI(int[] hours) {
        // earliest index each prefix value has been seen; {0: -1} lets
        // intervals starting at index 0 be handled uniformly
        Map<Integer, Integer> first = new HashMap<>();
        first.put(0, -1);
        int prefix = 0;
        int best = 0;
        for (int i = 0; i < hours.length; i++) {
            // tiring day scores +1, other -1: a well-performing interval is
            // exactly a subarray whose sum is strictly positive
            prefix += hours[i] > 8 ? 1 : -1;
            if (prefix > 0) {
                // the whole prefix hours[0..i] is already well-performing
                best = i + 1;
            } else if (first.containsKey(prefix - 1)) {
                // cut just after the earliest prefix-1: the remainder sums to
                // exactly 1, and since steps are unit-sized no longer interval
                // can end at i
                best = Math.max(best, i - first.get(prefix - 1));
            }
            if (!first.containsKey(prefix)) {
                // record only the first sighting so stored indices stay leftmost
                first.put(prefix, i);
            }
        }
        return best;
    }
}
