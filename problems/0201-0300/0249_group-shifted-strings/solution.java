import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[][] groupStrings(String[] strings) {
        Map<String, List<String>> groups = new LinkedHashMap<>();
        for (String string : strings) {
            // Anchoring on the first letter canonicalizes the shifting
            // sequence: left-shift the string until that letter becomes 'a'
            // — the same gap from it to every letter, mod 26 — so shifted
            // copies produce identical keys and unshiftable strings never
            // collide on one.
            char first = string.charAt(0);
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < string.length(); i++) {
                builder.append((char) ('a' + ((string.charAt(i) - first + 26) % 26)));
            }
            // computeIfAbsent creates the bucket on first sight of a key, so
            // group membership accumulates automatically: every string lands
            // in exactly one bucket, alongside precisely its shifts.
            groups.computeIfAbsent(builder.toString(), k -> new ArrayList<>()).add(string);
        }
        String[][] out = new String[groups.size()][];
        int i = 0;
        for (List<String> group : groups.values()) {
            out[i++] = group.toArray(new String[0]);
        }
        return out;
    }
}
