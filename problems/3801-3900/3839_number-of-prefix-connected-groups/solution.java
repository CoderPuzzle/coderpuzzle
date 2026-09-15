import java.util.HashMap;
import java.util.Map;

class Solution {

    public int prefixConnected(String[] words, int k) {
        // Sharing the first k characters is transitive, so each connected
        // group is exactly one k-prefix and counting groups of size >= 2
        // is counting prefixes that occur at least twice.
        Map<String, Integer> counts = new HashMap<>();
        for (String word : words) {
            if (word.length() >= k) {
                counts.merge(word.substring(0, k), 1, Integer::sum);
            }
        }
        // A group needs at least two words, so prefixes seen once do not
        // count; the answer is at most n <= 5000, exact in an int.
        int groups = 0;
        for (int c : counts.values()) {
            if (c >= 2) {
                groups++;
            }
        }
        return groups;
    }
}
