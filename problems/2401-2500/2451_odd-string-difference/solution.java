import java.util.HashMap;
import java.util.Map;

class Solution {

    public String oddString(String[] words) {
        // Encode each word as its difference signature (the n-1 consecutive
        // letter differences); the odd word is the one whose signature
        // appears exactly once.
        String[] sigs = new String[words.length];
        Map<String, Integer> count = new HashMap<>();
        for (int i = 0; i < words.length; ++i) {
            StringBuilder sb = new StringBuilder();
            for (int j = 1; j < words[i].length(); ++j) {
                sb.append(words[i].charAt(j) - words[i].charAt(j - 1)).append(',');
            }
            sigs[i] = sb.toString();
            count.put(sigs[i], count.getOrDefault(sigs[i], 0) + 1);
        }
        for (int i = 0; i < words.length; ++i) {
            if (count.get(sigs[i]) == 1) {
                return words[i];
            }
        }
        return "";
    }
}
