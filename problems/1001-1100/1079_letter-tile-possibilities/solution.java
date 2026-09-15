import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numTilePossibilities(String tiles) {
        // Map keyed by distinct letter, not a permutation of indices:
        // identical tiles collapse into one branch, so a sequence built from
        // duplicate letters is only ever counted once.
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : tiles.toCharArray()) {
            counts.merge(c, 1, Integer::sum);
        }
        return backtrack(counts);
    }

    private int backtrack(Map<Character, Integer> counts) {
        int total = 0;
        for (Map.Entry<Character, Integer> entry : counts.entrySet()) {
            if (entry.getValue() == 0) continue;
            // Placing this letter is itself one new, distinct sequence.
            entry.setValue(entry.getValue() - 1);
            total += 1 + backtrack(counts);
            entry.setValue(entry.getValue() + 1);
        }
        return total;
    }
}
