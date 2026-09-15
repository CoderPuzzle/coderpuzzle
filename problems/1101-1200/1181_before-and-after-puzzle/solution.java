import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

class Solution {

    public List<String> beforeAndAfterPuzzles(String[] phrases) {
        int n = phrases.length;
        String[][] words = new String[n][];
        for (int i = 0; i < n; i++) {
            words[i] = phrases[i].split(" ");
        }
        // File every phrase position under its first word: the bucket a
        // predecessor will search by its own last word.
        Map<String, List<Integer>> byFirst = new HashMap<>();
        for (int i = 0; i < n; i++) {
            byFirst.computeIfAbsent(words[i][0], k -> new ArrayList<>()).add(i);
        }
        TreeSet<String> results = new TreeSet<>();
        for (int i = 0; i < n; i++) {
            String last = words[i][words[i].length - 1];
            List<Integer> bucket = byFirst.get(last);
            if (bucket == null) {
                continue;
            }
            for (int j : bucket) {
                if (j == i) {
                    continue; // a phrase never pairs with its own position
                }
                StringBuilder merged = new StringBuilder(phrases[i]);
                for (int k = 1; k < words[j].length; k++) {
                    merged.append(' ').append(words[j][k]);
                }
                results.add(merged.toString());
            }
        }
        return new ArrayList<>(results);
    }
}
