import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] generateAbbreviations(String word) {
        // Each position doubles the possibilities: fold the character into
        // the running count, or keep the letter and flush the count first.
        // The abbreviate branch is tried first, so the results come out in
        // the canonical order the statement pins.
        List<String> results = new ArrayList<>();
        walk(word, 0, "", 0, results);
        return results.toArray(new String[0]);
    }

    private void walk(String word, int pos, String prefix, int count, List<String> results) {
        if (pos == word.length()) {
            results.add(count > 0 ? prefix + count : prefix);
            return;
        }
        // Abbreviate: extend the running count.
        walk(word, pos + 1, prefix, count + 1, results);
        // Keep: flush the pending count, then the letter.
        String kept = count > 0 ? prefix + count : prefix;
        walk(word, pos + 1, kept + word.charAt(pos), 0, results);
    }
}
