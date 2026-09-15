import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public String mostCommonWord(String paragraph, String[] banned) {
        Set<String> bannedSet = new HashSet<>();
        for (String word : banned) {
            bannedSet.add(word);
        }
        Map<String, Integer> counts = new HashMap<>();
        String bestWord = "";
        int bestCount = 0;
        StringBuilder word = new StringBuilder();
        // The trailing space closes a word still open when the paragraph
        // ends, so the loop never needs a separate flush.
        char[] cs = (paragraph + " ").toCharArray();
        for (char c : cs) {
            // ASCII puts every uppercase letter 32 codes above its
            // lowercase twin, so one range check + 32 folds the case;
            // every other character matches neither range and cuts the
            // word instead of joining it.
            if (c >= 'A' && c <= 'Z') {
                word.append((char) (c + 32));
            } else if (c >= 'a' && c <= 'z') {
                word.append(c);
            } else if (word.length() > 0) {
                String end = word.toString();
                word.setLength(0);
                if (!bannedSet.contains(end)) {
                    int count = counts.merge(end, 1, Integer::sum);
                    // Strictly greater keeps the earlier word on equal
                    // counts; the statement guarantees the answer is
                    // unique, so no tie ever reaches this comparison.
                    if (count > bestCount) {
                        bestCount = count;
                        bestWord = end;
                    }
                }
            }
        }
        return bestWord;
    }
}
