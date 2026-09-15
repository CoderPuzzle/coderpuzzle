import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maximumLength(String s) {
        // The size bound invites brute force: tally every special
        // substring in a hash map, then keep the longest that reached
        // three occurrences.
        Map<String, Integer> counts = new HashMap<>();
        int n = s.length();
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (s.charAt(j) != s.charAt(i)) break;
                String sub = s.substring(i, j + 1);
                counts.merge(sub, 1, Integer::sum);
            }
        }
        int best = -1;
        for (Map.Entry<String, Integer> e : counts.entrySet()) {
            if (e.getValue() >= 3 && e.getKey().length() > best) {
                best = e.getKey().length();
            }
        }
        return best;
    }
}
