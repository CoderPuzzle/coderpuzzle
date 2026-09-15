import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public String longestWord(String[] words) {
        // Sorted order visits every word after the word minus its last
        // character, so one sweep can grow the buildable set incrementally.
        Arrays.sort(words);
        String best = "";
        Set<String> buildable = new HashSet<>();
        for (String word : words) {
            // Buildable by the statement's rule: the word minus its last
            // character is already buildable, and a lone letter carries the
            // empty prefix, so it needs nothing.
            if (word.length() == 1 || buildable.contains(word.substring(0, word.length() - 1))) {
                buildable.add(word);
                // Strictly longer only: among equal lengths the first word
                // in sorted order — the lexicographically smallest — wins.
                if (word.length() > best.length()) {
                    best = word;
                }
            }
        }
        // Nothing buildable at all: the statement's empty-string answer.
        return best;
    }
}
