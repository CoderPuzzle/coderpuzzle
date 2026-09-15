import java.util.HashMap;
import java.util.Map;

class Solution {

    public String applySubstitutions(String[][] replacements, String text) {
        // The replacements form a DAG on keys: expand(key) renders its raw
        // value, recursing into each %X% reference exactly once via the memo.
        Map<String, String> raw = new HashMap<>();
        for (String[] pair : replacements) {
            raw.put(pair[0], pair[1]);
        }
        Map<String, String> done = new HashMap<>();
        StringBuilder out = new StringBuilder();
        int i = 0;
        while (i < text.length()) {
            if (text.charAt(i) == '%') {
                out.append(expand(text.substring(i + 1, i + 2), raw, done));
                i += 3;
            } else {
                out.append(text.charAt(i));
                i++;
            }
        }
        return out.toString();
    }

    private String expand(String key, Map<String, String> raw, Map<String, String> done) {
        String finished = done.get(key);
        if (finished != null) {
            return finished;
        }
        // %K% placeholders are three characters wide (single-letter
        // keys), so one linear scan splits value into literals and refs.
        String value = raw.get(key);
        StringBuilder out = new StringBuilder();
        int i = 0;
        while (i < value.length()) {
            if (value.charAt(i) == '%') {
                out.append(expand(value.substring(i + 1, i + 2), raw, done));
                i += 3;
            } else {
                out.append(value.charAt(i));
                i++;
            }
        }
        done.put(key, out.toString());
        return out.toString();
    }
}
