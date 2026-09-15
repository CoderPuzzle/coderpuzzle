import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

class Solution {

    public String[] shortestSubstrings(String[] arr) {
        // Join every other string into one scan text, NUL-separated so a
        // match can never straddle a boundary; since candidates contain
        // only lowercase letters, one containment test per candidate
        // then covers "occurs in any other string". Candidates are
        // tried shortest first and, within a length, in sorted order,
        // so the first survivor is both shortest and smallest.
        String[] answer = new String[arr.length];
        for (int i = 0; i < arr.length; i++) {
            StringBuilder text = new StringBuilder();
            for (int j = 0; j < arr.length; j++) {
                if (j != i) {
                    text.append(arr[j]).append('\0');
                }
            }
            String others = text.toString();
            String s = arr[i];
            String best = "";
            for (int length = 1; length <= s.length() && best.isEmpty(); length++) {
                TreeSet<String> candidates = new TreeSet<>();
                for (int a = 0; a + length <= s.length(); a++) {
                    candidates.add(s.substring(a, a + length));
                }
                for (String candidate : candidates) {
                    if (!others.contains(candidate)) {
                        best = candidate;
                        break;
                    }
                }
            }
            answer[i] = best;
        }
        return answer;
    }
}
