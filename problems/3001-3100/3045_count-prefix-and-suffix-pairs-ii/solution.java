import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long countPrefixSuffixPairs(String[] words) {
        // Trie over paired characters (first+last, second+second-last, ...).
        // Node counters stay below 10^5, but the total can reach ~5 * 10^9,
        // so the accumulator is a long.
        Map<Integer, Integer> edges = new HashMap<>();
        List<Integer> counts = new ArrayList<>();
        counts.add(0);
        long total = 0;
        for (String word : words) {
            int size = word.length();
            int node = 0;
            for (int j = 0; j < size; ++j) {
                int key = node * 676 + (word.charAt(j) - 'a') * 26 + (word.charAt(size - 1 - j) - 'a');
                Integer next = edges.get(key);
                if (next == null) {
                    next = counts.size();
                    edges.put(key, next);
                    counts.add(0);
                }
                node = next;
                total += counts.get(node);
            }
            counts.set(node, counts.get(node) + 1);
        }
        return total;
    }
}
