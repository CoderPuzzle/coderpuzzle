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
        List<String> ranked = new ArrayList<>(counts.keySet());
        // Sort every unique word under the statement's total order — count
        // descending, then word ascending — and keep the first k.
        ranked.sort((a, b) -> {
            int ca = counts.get(a),
                cb = counts.get(b);
            return ca != cb ? Integer.compare(cb, ca) : a.compareTo(b);
        });
        String[] result = new String[k];
        for (int i = 0; i < k; i++) {
            result[i] = ranked.get(i);
        }
        return result;
    }
}
