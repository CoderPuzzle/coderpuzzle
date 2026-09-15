import java.util.HashMap;
import java.util.Map;

class Solution {

    public String evaluate(String s, String[][] knowledge) {
        // One left-to-right pass: a '(' hands control to the matching ')',
        // the enclosed key goes through the map, everything else is copied
        // verbatim. Values are bracket-free, so nothing emitted is ever
        // re-examined.
        Map<String, String> known = new HashMap<>();
        for (String[] pair : knowledge) {
            known.put(pair[0], pair[1]);
        }
        StringBuilder out = new StringBuilder();
        int i = 0;
        int n = s.length();
        while (i < n) {
            char c = s.charAt(i);
            if (c == '(') {
                int j = s.indexOf(')', i);
                out.append(known.getOrDefault(s.substring(i + 1, j), "?"));
                i = j + 1;
            } else {
                out.append(c);
                i++;
            }
        }
        return out.toString();
    }
}
