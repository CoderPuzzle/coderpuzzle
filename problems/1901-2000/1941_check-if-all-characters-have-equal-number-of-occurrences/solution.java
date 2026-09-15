import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public boolean areOccurrencesEqual(String s) {
        // Every present character must share one frequency, so the set of
        // the per-character counts has size one.
        Map<Character, Integer> counts = new HashMap<>();
        for (char ch : s.toCharArray()) {
            counts.merge(ch, 1, Integer::sum);
        }
        return new HashSet<>(counts.values()).size() == 1;
    }
}
