import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class ValidWordAbbr {

    // One abbreviation group per abbreviation, held as a set of words;
    // isUnique() applies the two-condition rule directly: the group for
    // the query's abbreviation must be empty, or contain nothing but the
    // query itself.
    private final Map<String, Set<String>> groups = new HashMap<>();

    private static String abbrev(String word) {
        // First letter + count of the letters between + last letter; a
        // word of one or two characters is an abbreviation of itself.
        if (word.length() <= 2) return word;
        return word.charAt(0) + Integer.toString(word.length() - 2) + word.charAt(word.length() - 1);
    }

    public ValidWordAbbr(String[] dictionary) {
        // A set per abbreviation: listing "deer" twice must leave the
        // group {"deer"} — a word never collides with its own duplicates.
        for (String word : dictionary) {
            groups.computeIfAbsent(abbrev(word), key -> new HashSet<>()).add(word);
        }
    }

    public boolean isUnique(String word) {
        Set<String> group = groups.get(abbrev(word));
        // No word with this abbreviation, or every such word is `word`.
        return group == null || (group.size() == 1 && group.contains(word));
    }
}
