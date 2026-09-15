import java.util.HashMap;
import java.util.Map;

class Solution {

    public int findPairs(int[] nums, int k) {
        // One count map carries both halves: its keys are the distinct
        // values, so v + k membership is O(1), and its frequencies are
        // exactly what k == 0 asks for. A pair is identified by its two
        // values, so repeats enter the same pair at most once.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) {
            counts.merge(value, 1, Integer::sum);
        }
        int pairs = 0;
        if (k == 0) {
            // A 0-diff pair needs two equal values at different indexes, so a
            // value contributes once when it occurs at least twice — further
            // copies add nothing.
            for (int frequency : counts.values()) {
                if (frequency > 1) ++pairs;
            }
        } else {
            // k > 0: count each distinct value whose partner v + k is also
            // present; scanning only upward pairs every couple exactly once
            // and never matches a value with itself.
            for (int value : counts.keySet()) {
                if (counts.containsKey(value + k)) ++pairs;
            }
        }
        return pairs;
    }
}
