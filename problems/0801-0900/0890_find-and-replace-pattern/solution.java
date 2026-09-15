import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] findAndReplacePattern(String[] words, String pattern) {
        // Reduce the pattern to its first-appearance signature once; a
        // word matches exactly when its own signature is the same
        // sequence, so no letter-to-letter maps are ever built.
        int[] target = signature(pattern);
        List<String> matches = new ArrayList<>();
        for (String w : words) {
            if (Arrays.equals(signature(w), target)) {
                matches.add(w);
            }
        }
        return matches.toArray(new String[0]);
    }

    // Index each letter by its first appearance in s: "abb" -> [0, 1, 1].
    private static int[] signature(String s) {
        Map<Character, Integer> first = new HashMap<>();
        int[] sig = new int[s.length()];
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (!first.containsKey(c)) {
                first.put(c, first.size());
            }
            sig[i] = first.get(c);
        }
        return sig;
    }
}
