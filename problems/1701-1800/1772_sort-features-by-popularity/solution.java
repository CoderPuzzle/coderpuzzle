import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public String[] sortFeatures(String[] features, String[] responses) {
        // A response contributes to a feature at most once: count each
        // distinct word of the response that names a feature.
        Map<String, Integer> popularity = new HashMap<>();
        for (String f : features) {
            popularity.put(f, 0);
        }
        for (String response : responses) {
            Set<String> seen = new HashSet<>();
            for (String word : response.split(" ")) {
                seen.add(word);
            }
            for (String word : seen) {
                if (popularity.containsKey(word)) {
                    popularity.merge(word, 1, Integer::sum);
                }
            }
        }
        // Total order: higher popularity first, then the earlier original
        // index — the comparator fully orders every pair, so no sort
        // stability is relied on.
        Integer[] order = new Integer[features.length];
        for (int i = 0; i < order.length; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> {
            int pa = popularity.get(features[a]);
            int pb = popularity.get(features[b]);
            return pa != pb ? Integer.compare(pb, pa) : Integer.compare(a, b);
        });
        String[] result = new String[features.length];
        for (int i = 0; i < order.length; i++) {
            result[i] = features[order[i]];
        }
        return result;
    }
}
