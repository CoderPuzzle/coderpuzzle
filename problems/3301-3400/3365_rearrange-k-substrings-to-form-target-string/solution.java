import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean isPossibleToRearrange(String s, String t, int k) {
        // The rearrangement exists exactly when the two chunk multisets
        // match: any order of t's chunks is reachable, and every piece of
        // s must be consumed whole. Hash-counting makes the comparison a
        // single O(n) pass over the two chunk sequences.
        int size = s.length() / k;
        Map<String, Integer> counts = new HashMap<>();
        for (int i = 0; i < k; ++i) {
            String chunk = s.substring(i * size, (i + 1) * size);
            counts.merge(chunk, 1, Integer::sum);
        }
        for (int i = 0; i < k; ++i) {
            String chunk = t.substring(i * size, (i + 1) * size);
            int left = counts.getOrDefault(chunk, 0);
            if (left == 0) return false;
            counts.put(chunk, left - 1);
        }
        return true;
    }
}
