import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {

    public String[] topKFrequent(String[] words, int k) {
        // One counting pass over the array.
        Map<String, Integer> counts = new HashMap<>();
        for (String w : words) {
            counts.merge(w, 1, Integer::sum);
        }
        // Size-k min-heap whose root is the weakest keeper: smallest
        // count, and among equal counts the largest word — eviction
        // order mirrors the final ranking.
        PriorityQueue<String> heap = new PriorityQueue<>((a, b) -> {
            int ca = counts.get(a),
                cb = counts.get(b);
            return ca != cb ? Integer.compare(ca, cb) : b.compareTo(a);
        });
        for (String word : counts.keySet()) {
            if (heap.size() < k) {
                heap.offer(word);
                continue;
            }
            String root = heap.peek();
            // Replace the root only when the newcomer outranks it:
            // higher count, or equal count and smaller word.
            int ca = counts.get(word),
                cr = counts.get(root);
            if (ca > cr || (ca == cr && word.compareTo(root) < 0)) {
                heap.poll();
                heap.offer(word);
            }
        }
        List<String> survivors = new ArrayList<>(heap);
        // Survivors are exactly the top k by (higher count, then smaller
        // word); emit them in that order.
        survivors.sort((a, b) -> {
            int ca = counts.get(a),
                cb = counts.get(b);
            return ca != cb ? Integer.compare(cb, ca) : a.compareTo(b);
        });
        String[] result = new String[k];
        for (int i = 0; i < k; i++) {
            result[i] = survivors.get(i);
        }
        return result;
    }
}
