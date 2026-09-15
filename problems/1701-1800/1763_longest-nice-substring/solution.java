import java.util.HashSet;
import java.util.Set;

class Solution {

    public String longestNiceSubstring(String s) {
        // A character missing its case-partner anywhere in the string
        // can never sit inside a nice window: split on every offender
        // and recurse. Segments with no offenders are entirely nice.
        if (s.length() < 2) {
            return "";
        }
        Set<Character> chars = new HashSet<>();
        for (char c : s.toCharArray()) {
            chars.add(c);
        }
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (!chars.contains(Character.toLowerCase(c)) || !chars.contains(Character.toUpperCase(c))) {
                String left = longestNiceSubstring(s.substring(0, i));
                String right = longestNiceSubstring(s.substring(i + 1));
                return left.length() >= right.length() ? left : right;
            }
        }
        return s;
    }
}
