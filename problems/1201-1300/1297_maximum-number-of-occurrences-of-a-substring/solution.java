import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxFreq(String s, int maxLetters, int minSize, int maxSize) {
        // A length-L qualifying substring (L > minSize) has a minSize prefix
        // occurring at least as often, so only exact-minSize windows count.
        Map<String, Integer> counts = new HashMap<>();
        int best = 0;
        for (int start = 0; start + minSize <= s.length(); ++start) {
            String window = s.substring(start, start + minSize);
            if (window.chars().distinct().count() <= maxLetters) {
                int next = counts.merge(window, 1, Integer::sum);
                if (next > best) best = next;
            }
        }
        return best;
    }
}
