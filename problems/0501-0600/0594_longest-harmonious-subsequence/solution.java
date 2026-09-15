import java.util.HashMap;
import java.util.Map;

class Solution {

    public int findLHS(int[] nums) {
        // Deletion freedom reduces the subsequence to its value multiset:
        // only how often each value occurs matters, never the order. The
        // exactly-1 gap forces a harmonious pick onto the two values v and
        // v + 1, and a count-map key occurs at least once, so looking up
        // each key's successor is exactly the both-values-present test; the
        // largest count(v) + count(v + 1) wins, 0 when no adjacent pair
        // exists.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) {
            counts.merge(value, 1, Integer::sum);
        }
        int best = 0;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            int next = entry.getKey() + 1;
            if (counts.containsKey(next)) {
                best = Math.max(best, entry.getValue() + counts.get(next));
            }
        }
        return best;
    }
}
