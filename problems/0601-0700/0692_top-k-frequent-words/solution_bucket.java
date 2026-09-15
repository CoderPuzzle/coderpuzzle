import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] topKFrequent(String[] words, int k) {
        // One counting pass over the array.
        Map<String, Integer> counts = new HashMap<>();
        for (String w : words) {
            counts.merge(w, 1, Integer::sum);
        }
        // Buckets indexed by frequency: a word with count c lands in
        // buckets[c], and no count can exceed n.
        int n = words.length;
        List<List<String>> buckets = new ArrayList<>(n + 1);
        for (int i = 0; i <= n; i++) {
            buckets.add(new ArrayList<>());
        }
        for (Map.Entry<String, Integer> e : counts.entrySet()) {
            buckets.get(e.getValue()).add(e.getKey());
        }
        String[] result = new String[k];
        int taken = 0;
        // Walk frequencies from the highest possible down; within one
        // bucket sort words ascending, so ties break alphabetically —
        // and stop as soon as k words are in hand.
        for (int c = n; c >= 1 && taken < k; c--) {
            List<String> bucket = buckets.get(c);
            if (bucket.isEmpty()) {
                continue;
            }
            bucket.sort(null);
            for (String word : bucket) {
                if (taken == k) break;
                result[taken++] = word;
            }
        }
        return result;
    }
}
