import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[][] groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new LinkedHashMap<>();
        for (String word : strs) {
            char[] chars = word.toCharArray();
            // Sorting canonicalizes the character multiset: anagrams produce
            // byte-identical keys and non-anagrams can never collide on one.
            Arrays.sort(chars);
            String key = new String(chars);
            // computeIfAbsent creates the bucket on first sight of a key, so
            // group membership accumulates automatically: every word lands in
            // exactly one bucket, alongside precisely its rearrangements.
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
        }
        String[][] out = new String[groups.size()][];
        int i = 0;
        for (List<String> group : groups.values()) {
            out[i++] = group.toArray(new String[0]);
        }
        return out;
    }
}
