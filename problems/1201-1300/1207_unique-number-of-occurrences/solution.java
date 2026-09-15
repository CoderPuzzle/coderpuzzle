import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public boolean uniqueOccurrences(int[] arr) {
        // Count every value, then test each count for a repeat: the answer
        // is false exactly when a second value reports the same frequency.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : arr) {
            counts.put(value, counts.getOrDefault(value, 0) + 1);
        }
        Set<Integer> seen = new HashSet<>();
        for (int count : counts.values()) {
            if (!seen.add(count)) {
                return false;
            }
        }
        return true;
    }
}
