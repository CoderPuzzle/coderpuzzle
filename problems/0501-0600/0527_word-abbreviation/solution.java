import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] wordsAbbreviation(String[] words) {
        // Every word starts at a one-letter prefix: first character, count of
        // the middle, last character. Abbreviations can only clash between
        // equal-length words sharing that prefix and their last letter, and
        // the cure is collective — every clashing group grows its prefix by
        // one and re-groups, until each abbreviation stands alone.
        int n = words.length;
        int[] prefix = new int[n];
        Arrays.fill(prefix, 1);
        Map<String, List<Integer>> groups = new HashMap<>();
        while (true) {
            groups.clear();
            for (int i = 0; i < n; ++i) {
                groups.computeIfAbsent(abbreviate(words[i], prefix[i]), k -> new ArrayList<>()).add(i);
            }
            boolean unique = true;
            for (List<Integer> ids : groups.values()) {
                if (ids.size() > 1) {
                    unique = false;
                    for (int i : ids) {
                        ++prefix[i];
                    }
                }
            }
            if (unique) {
                break;
            }
        }
        String[] result = new String[n];
        for (int i = 0; i < n; ++i) {
            String abbr = abbreviate(words[i], prefix[i]);
            // An abbreviation no shorter than the word itself buys nothing.
            result[i] = abbr.length() < words[i].length() ? abbr : words[i];
        }
        return result;
    }

    private String abbreviate(String word, int p) {
        return word.substring(0, p) + (word.length() - p - 1) + word.charAt(word.length() - 1);
    }
}
