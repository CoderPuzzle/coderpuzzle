import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public String findCommonResponse(String[][] responses) {
        // Deduplicate within each day first — a response repeated in the
        // same day still counts once — then tally the deduped words across
        // days in a hash map and keep the best (count, lexicographic order)
        // seen.
        Map<String, Integer> counts = new HashMap<>();
        for (String[] day : responses) {
            Set<String> unique = new HashSet<>();
            for (String word : day) {
                unique.add(word);
            }
            for (String word : unique) {
                counts.merge(word, 1, Integer::sum);
            }
        }
        String bestWord = "";
        int bestCount = 0;
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            String word = entry.getKey();
            int count = entry.getValue();
            if (count > bestCount || (count == bestCount && word.compareTo(bestWord) < 0)) {
                bestWord = word;
                bestCount = count;
            }
        }
        return bestWord;
    }
}
