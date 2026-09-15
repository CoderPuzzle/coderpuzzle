import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] uncommonFromSentences(String s1, String s2) {
        // The pinned order is s1's words then s2's, and joining the
        // sentences with one space makes a single stream in that order.
        String[] words = (s1 + " " + s2).split(" ");
        Map<String, Integer> counts = new HashMap<>();
        for (String word : words) {
            counts.merge(word, 1, Integer::sum);
        }
        List<String> result = new ArrayList<>();
        // An uncommon word occurs exactly once overall, so emitting it at
        // its only occurrence is first-appearance order within each
        // sentence — no sort, no seen-list, no hash iteration order.
        for (String word : words) {
            if (counts.get(word) == 1) {
                result.add(word);
            }
        }
        return result.toArray(new String[0]);
    }
}
